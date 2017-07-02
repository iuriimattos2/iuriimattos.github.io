appServices.factory('CourseService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var courses = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["course"], "readwrite")
			transaction = transaction.objectStore("course");

			try {
				transaction.add({
					name: obj.name,
					acronym: obj.acronym
				}).onsuccess = function(event) {
					done({
						id: event.target.result,
						name: obj.name,
						acronym: obj.acronym
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["course"], "readwrite");
			objectStore = transaction.objectStore("course");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;
			if (cursor) {
				courses.push({
					id: cursor.key,
					name: cursor.value.name,
					acronym: cursor.value.acronym
				});

				cursor.continue();
			}
		};

		function checkIsDone() {
			var transaction;
			var store;

			if (database.readyState !== "done") {
				setTimeout(checkIsDone, 100)
				return;
			}

			db = database.result;
			transaction = db.transaction(["course"], "readonly");
			store = transaction.objectStore("course");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.courses.splice(0, this.courses.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["course"], "readwrite")
			transaction = transaction.objectStore("course");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.value.acronym = obj.acronym;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('courses');
						}
					}
				}
			}
		};

		function get(course, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["course"]);
				store = transaction.objectStore("course");
				editRequest = store.get(Number(course.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name,
						acronym: editRequest.result.acronym
					});
				};
			};
			checkIsDone()
		}

		return {
			courses: courses,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);