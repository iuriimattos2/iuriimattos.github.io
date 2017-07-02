appServices.factory('ClasseService', ['GlobalService', '$state',
	function(GlobalService, $state) {
		var classes = [];
		var database = GlobalService.database;
		var db = GlobalService.db;

		function insert(obj, done) {
			var transaction;

			transaction = db.transaction(["classe"], "readwrite")
			console.log(transaction)
			transaction = transaction.objectStore("classe");

			try {
				transaction.add({
					course: obj.course,
					module: obj.module,
					turn: obj.turn,
					code: obj.code,
					startdate: obj.startdate,
					enddate: obj.enddate,
					status: obj.status
				}).onsuccess = function(event) {
					done({
						id: event.target.result,
						course: obj.course,
						module: obj.module,
						turn: obj.turn,
						code: obj.code,
						startdate: obj.startdate,
						enddate: obj.enddate,
						status: obj.status
					});
				}
			} catch (e) {}
		}

		function remove(id) {
			var transaction;
			var objectStore;
			var objectStoreRequest;

			transaction = db.transaction(["classe"], "readwrite");
			objectStore = transaction.objectStore("classe");
			objectStoreRequest = objectStore.delete(id);
		};

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				classes.push({
					id: cursor.key,
					course: cursor.value.course,
					module: cursor.value.module,
					turn: cursor.value.turn,
					code: cursor.value.code,
					startdate: cursor.value.startdate,
					enddate: cursor.value.enddate,
					status: cursor.value.status
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
			transaction = db.transaction(["classe"], "readonly");
			store = transaction.objectStore("classe");
			store.openCursor().onsuccess = list;
		};

		function listAll() {
			this.classes.splice(0, this.classes.length);
			checkIsDone();
		};

		function update(obj) {
			var transaction;
			transaction = db.transaction(["classe"], "readwrite")
			transaction = transaction.objectStore("classe");
			transaction.openCursor(Number(obj.key)).onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					if (cursor.key == obj.key) {
						cursor.value.course = obj.course;
						cursor.value.module = obj.module;
						cursor.value.turn = obj.turn;
						cursor.value.code = obj.code;
						cursor.value.startdate = obj.startdate;
						cursor.value.enddate = obj.enddate;
						cursor.value.status = obj.status;
						cursor.update(cursor.value).onsuccess = function() {
							$state.go('classes');
						}
					}
				}
			}
		}

		function get(classe, done) {
			function checkIsDone() {
				if (database.readyState !== "done") {
					setTimeout(checkIsDone, 100)
					return;
				}
				var store;
				var transaction;

				db = database.result;
				transaction = db.transaction(["classe"]);
				store = transaction.objectStore("classe");
				editRequest = store.get(Number(classe.id))

				editRequest.onerror = function(event) {
					alert(event)
				};
				editRequest.onsuccess = function(event) {
					done({
						course: editRequest.result.course,
						module: editRequest.result.module,
						turn: editRequest.result.turn,
						code: editRequest.result.code,
						startdate: editRequest.result.startdate,
						enddate: editRequest.result.enddate,
						status: editRequest.result.status
					});
				};
			};
			checkIsDone()
		};

		return {
			classes: classes,
			insert: insert,
			remove: remove,
			listAll: listAll,
			update: update,
			get: get
		}
	}
]);