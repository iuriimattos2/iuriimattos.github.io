appServices.factory('LessonsService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var lessons = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function generate(nextLessons, done) {
			var insert;
			var lessonsDone = [];
			var transaction;

			transaction = db.transaction(["lesson"], "readwrite");
			transaction = transaction.objectStore("lesson");

			try {
				nextLessons.forEach(function(lesson) {
					insert = transaction.add({
						date: lesson.date,
						hour: lesson.hour,
						classe: lesson.classe,
						room: lesson.room,
						teacher: lesson.teacher
					});
					insert.onsuccess = function(event) {
						var id = event.target.result;
						lessonsDone.push({
							id: id,
							date: lesson.date,
							hour: lesson.hour,
							classe: lesson.classe,
							room: lesson.room,
							teacher: lesson.teacher
						});

						if (lessonsDone.length === nextLessons.length) {
							done(lessonsDone);
						}
					}
				});
			} catch (e) {}
		};

		function remove(id) {
			var transaction = db.transaction(["lesson"], "readwrite");
			var objectStore = transaction.objectStore("lesson");
			var objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				lessons.push({
					id: cursor.key,
					date: cursor.value.date,
					hour: cursor.value.hour,
					classe: cursor.value.classe,
					room: cursor.value.room,
					teacher: cursor.value.teacher
				});

				cursor.continue();
			}
		};

		function checkIsDone() {
			var store;
			var transaction;

			if (database.readyState !== "done") {
				setTimeout(checkIsDone, 100)
				return;
			}

			db = database.result;
			transaction = db.transaction(["lesson"], "readonly");
			store = transaction.objectStore("lesson");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.lessons.splice(0, this.lessons.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["lesson"], "readwrite");
			transaction = transaction.objectStore("lesson");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					console.log(obj.hour)
					if (cursor.key == obj.key) {
						cursor.value.date = obj.date;
						cursor.value.hour = obj.hour;
						cursor.value.classe = obj.classe;
						cursor.value.room = obj.room;
						cursor.value.teacher = obj.teacher;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('lessons');
						}
					}
				}
			}
		};

		function get(lesson, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["lesson"]);
				store = transaction.objectStore("lesson");
				editRequest = store.get(Number(lesson.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						date: editRequest.result.date,
						hour: editRequest.result.hour,
						classe: editRequest.result.classe,
						room: editRequest.result.room,
						teacher: editRequest.result.teacher
					});
				};
			};
			checkIsDone();
		};

		return {
			lessons: lessons,
			generate: generate,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);