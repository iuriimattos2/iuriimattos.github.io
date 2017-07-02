appServices.factory('RoomsService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var rooms = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["room"], "readwrite");
			transaction = transaction.objectStore("room");

			try {
				transaction.add({
					name: obj.name,
					capacity: obj.capacity
				}).onsuccess = function(event) {
					done({
						id: event.target.result,
						name: obj.name,
						capacity: obj.capacity
					});
				}
			} catch (e) {}
		};

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["room"], "readwrite");
			objectStore = transaction.objectStore("room");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;
			if (cursor) {
				rooms.push({
					id: cursor.key,
					name: cursor.value.name,
					capacity: cursor.value.capacity
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
			transaction = db.transaction(["room"], "readonly");
			store = transaction.objectStore("room");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.rooms.splice(0, this.rooms.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["room"], "readwrite");
			transaction = transaction.objectStore("room");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.name = obj.name;
						cursor.value.capacity = obj.capacity;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('rooms');
						}
					}
				}
			}
		};

		function get(room, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var transaction;
				var store;

				db = database.result;
				transaction = db.transaction(["room"]);
				store = transaction.objectStore("room");
				editRequest = store.get(Number(room.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						name: editRequest.result.name,
						capacity: editRequest.result.capacity
					});
				};
			};
			checkIsDone();
		};

		return {
			rooms: rooms,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);