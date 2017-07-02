appServices.factory('HolidayService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var holidays = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["holiday"], "readwrite");
			transaction = transaction.objectStore("holiday");

			try {
				transaction.add({
					name: obj.name,
					date: obj.date
				}).onsuccess = function(event) {
					id = event.target.result;

					done({
						id: id,
						name: obj.name,
						date: obj.date
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["holiday"], "readwrite");
			objectStore = transaction.objectStore("holiday");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				holidays.push({
					id: cursor.key,
					name: cursor.value.name,
					date: cursor.value.date
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
			transaction = db.transaction(["holiday"], "readonly");
			store = transaction.objectStore("holiday");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.holidays.splice(0, this.holidays.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["holiday"], "readwrite");
			transaction = transaction.objectStore("holiday");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.value.date = obj.date;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('holidays');
						}
					}
				}
			}
		};

		function get(holiday, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["holiday"]);
				store = transaction.objectStore("holiday");
				editRequest = store.get(Number(holiday.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name,
						date: editRequest.result.date
					});
				};
			};
			checkIsDone();
		};

		return {
			holidays: holidays,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);