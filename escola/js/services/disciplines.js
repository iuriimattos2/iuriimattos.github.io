appServices.factory('DisciplineService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var disciplines = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["discipline"], "readwrite");
			transaction = transaction.objectStore("discipline");

			try {
				transaction.add({
					name: obj.name,
					module: obj.module,
					teacher: obj.teacher
				}).onsuccess = function(event) {
					id = event.target.result;
					done({
						id: id,
						name: obj.name,
						module: obj.module,
						teacher: obj.teacher
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["discipline"], "readwrite");
			objectStore = transaction.objectStore("discipline");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				disciplines.push({
					id: cursor.key,
					name: cursor.value.name,
					module: cursor.value.module,
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
			transaction = db.transaction(["discipline"], "readonly");
			store = transaction.objectStore("discipline");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.disciplines.splice(0, this.disciplines.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["discipline"], "readwrite");
			transaction = transaction.objectStore("discipline");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.value.module = obj.module;
						cursor.value.teacher = obj.teacher;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('disciplines');
						}
					}
				}
			}
		};

		function get(discipline, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["discipline"]);
				store = transaction.objectStore("discipline");
				editRequest = store.get(Number(discipline.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name,
						module: editRequest.result.module,
						teacher: editRequest.result.teacher
					});
				};
			};
			checkIsDone();
		};

		return {
			disciplines: disciplines,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);