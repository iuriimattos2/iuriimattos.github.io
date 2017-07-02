appServices.factory('TeacherService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var teachers = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["teacher"], "readwrite");
			transaction = transaction.objectStore("teacher");

			try {
				transaction.add({
					name: obj.name
				}).onsuccess = function(event) {
					done({
						id: event.target.result,
						name: obj.name
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["teacher"], "readwrite");
			objectStore = transaction.objectStore("teacher");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;
			if (cursor) {
				teachers.push({
					id: cursor.key,
					name: cursor.value.name
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
			transaction = db.transaction(["teacher"], "readonly");
			store = transaction.objectStore("teacher");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.teachers.splice(0, this.teachers.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["teacher"], "readwrite");
			transaction = transaction.objectStore("teacher");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('teachers');
						}
					}
				}
			}
		};

		function get(teacher, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["teacher"]);
				store = transaction.objectStore("teacher");
				editRequest = store.get(Number(teacher.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name
					});
				};
			};
			checkIsDone();
		};

		return {
			teachers: teachers,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);