appServices.factory('GlobalService', ['$window',
	function($window) {
		var db = null;
		var dbversion = 1;
		var database = window.indexedDB.open("EscolaAPP", dbversion);

		function onupgradeneeded(e) {
			db = e.target.result;

			if (!db.objectStoreNames.contains('course')) {
				db.createObjectStore("course", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('module')) {
				db.createObjectStore("module", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('holiday')) {
				db.createObjectStore("holiday", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('discipline')) {
				db.createObjectStore("discipline", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('teacher')) {
				db.createObjectStore("teacher", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('student')) {
				db.createObjectStore("student", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('room')) {
				db.createObjectStore("room", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('classe')) {
				db.createObjectStore("classe", {
					keyPath: null,
					autoIncrement: true
				});
			}

			if (!db.objectStoreNames.contains('lesson')) {
				db.createObjectStore("lesson", {
					keyPath: null,
					autoIncrement: true
				});
			}

		}

		function exportdb() {
			if (database.readyState !== "done") {
				setTimeout(exportdb, 100)
				return;
			}
			if (!db) return;
			var link = $("#exportLink");
			var data = {};
			var promises = [];
			console.log(db.objectStoreNames)
			for (var i = 0; i < db.objectStoreNames.length; i++) {
				promises.push(
					$.Deferred(function(defer) {
						var objectstore = db.objectStoreNames[i];
						console.log(objectstore);
						var transaction = db.transaction([objectstore], "readonly");
						var content = [];
						transaction.oncomplete = function(event) {
							console.log("trans oncomplete for " + objectstore + " with " + content.length + " items");
							defer.resolve({
								name: objectstore,
								data: content
							});
						};

						transaction.onerror = function(event) {
							// Don't forget to handle errors!
							console.dir(event);
						};

						var handleResult = function(event) {
							var cursor = event.target.result;
							if (cursor) {
								content.push({
									key: cursor.key,
									value: cursor.value
								});
								cursor.continue();
							}
						};

						var objectStore = transaction.objectStore(objectstore);
						objectStore.openCursor().onsuccess = handleResult;

					}).promise()

				);
			}
			$.when.apply(null, promises).then(function(result) {
				console.log(result)
					//arguments is an array of structs where name=objectstorename and data=array of crap
					//make a copy cuz I just don't like calling it argument
				var dataToStore = arguments;
				console.log(dataToStore)
					//serialize it
				var serializedData = JSON.stringify(dataToStore);
				console.log(serializedData)
					//The Christian Cantrell solution
					//document.location = 'data:Application/octet-stream,' + encodeURIComponent(serializedData);
				link.attr("href", 'data:Application/octet-stream,' + encodeURIComponent(serializedData));
				alert('Backup de dados realizado com sucesso. Forneça a senha de backup para concluir o download')
				var password = prompt("Insira a senha de backup")
				if (password == "sim") {
					var blob = new Blob([serializedData], {
						type: "text/plain;charset=utf-8"
					});
					saveAs(blob, "data.json")
				}
				console.log(encodeURIComponent(serializedData))
					//link.trigger("click");
					// fakeClick(link[0]);
			});

		}

		function importdb() {
			jQuery.getJSON('data.json', function(data) {
				var transaction;
				var db;
				var database;

				database = window.indexedDB.open("EscolaAPP", 1);
				database.onsuccess = function(e) {
					db = e.target.result;

					jQuery.each(data, function(key, value) {
						transaction = db.transaction(value.name, "readwrite");
						transaction = transaction.objectStore(value.name);
						if (value.data.length > 0) {
							if (value.name == "classe") {
								value.data.forEach(function(obj) {
									try {
										transaction.put({
											classcode: obj.value.classcode,
											course: obj.value.course,
											enddate: obj.value.enddate,
											module: obj.value.module,
											startdate: obj.value.startdate,
											status: obj.value.status,
											turn: obj.value.turn
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "course") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											name: obj.value.name,
											acronym: obj.value.acronym
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "discipline") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											module: obj.value.module,
											name: obj.value.name,
											teacher: obj.value.teacher
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "holiday") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											date: obj.value.date,
											name: obj.value.name
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "lesson") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											classe: obj.value.classe,
											hour: obj.value.hour,
											enddate: obj.value.enddate,
											nextLessonFormated: obj.value.nextLessonFormated,
											room: obj.value.room,
											teacher: obj.value.teacher
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "module") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											acronym: obj.value.acronym,
											course: obj.value.course,
											name: obj.value.name
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "room") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											capacity: obj.value.capacity,
											name: obj.value.name
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "student") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											classe: obj.value.classe,
											course: obj.value.course,
											name: obj.value.name
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
							if (value.name == "teacher") {
								value.data.forEach(function(obj) {
									console.log(obj)
									try {
										transaction.put({
											name: obj.value.name
										}, obj.key).onsuccess = function(event) {}
									} catch (e) {
										alert(e)
									}
								});
							}
						}
					})
				}
			});
		}

		database.onupgradeneeded = onupgradeneeded;

		$("#exportButton").click(function() {
			database = window.indexedDB.open("EscolaAPP", dbversion);
			database.onsuccess = onsuccess;

			function onsuccess(e) {
				db = database.result
				exportdb();
			}
		});

		$("#importButton").click(function() {
			database = window.indexedDB.open("EscolaAPP", dbversion);
			database.onsuccess = onsuccess;

			function onsuccess(e) {
				db = database.result
				importdb();
			}
		});

		$("#exportLink").click(function() {
			$(this).hide();
			$("#exportButton").show();
		});

		return {
			db: db,
			database: database
		};
	}
]);