appServices.factory('ModulesService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var modules = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["module"], "readwrite")
			transaction = transaction.objectStore("module");

			try {
				transaction.add({
					name: obj.name,
					course: obj.course,
					acronym: obj.acronym
				}).onsuccess = function(event) {
					id = event.target.result;
					done({
						id: id,
						name: obj.name,
						course: obj.course,
						acronym: obj.acronym
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["module"], "readwrite");
			objectStore = transaction.objectStore("module");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				modules.push({
					id: cursor.key,
					name: cursor.value.name,
					course: cursor.value.course,
					acronym: cursor.value.acronym
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
			transaction = db.transaction(["module"], "readonly");
			store = transaction.objectStore("module");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.modules.splice(0, this.modules.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["module"], "readwrite");
			transaction = transaction.objectStore("module");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.value.course = obj.course;
						cursor.value.acronym = obj.acronym;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('modules');
						}
					}
				}
			}
		};

		function get(module, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["module"]);
				store = transaction.objectStore("module");
				editRequest = store.get(Number(module.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name,
						course: editRequest.result.course,
						acronym: editRequest.result.acronym
					});
				};
			};
			checkIsDone();
		};

		return {
			modules: modules,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);