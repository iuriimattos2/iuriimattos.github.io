appServices.factory('StudentService', ['GlobalService',
	function(GlobalService) {
		var students = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["student"], "readwrite");
			transaction = transaction.objectStore("student");

			try {
				transaction.add({
					name: obj.name,
					course: obj.course,
					classe: obj.classe
				}).onsuccess = function(event) {
					id = event.target.result;
					done({
						id: id,
						name: obj.name,
						course: obj.course,
						classe: obj.classe
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["student"], "readwrite");
			objectStore = transaction.objectStore("student");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				students.push({
					id: cursor.key,
					name: cursor.value.name,
					course: cursor.value.course,
					classe: cursor.value.classe
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
			transaction = db.transaction(["student"], "readonly");
			store = transaction.objectStore("student");
			store.openCursor().onsuccess = list
		};

		checkIsDone();

		return {
			students: students,
			insert: insert,
			remove: remove
		}
	}
]);