var escola = angular.module('escola', ['appServices', 'ui.router']),
	appServices = angular.module('appServices', ['ngResource']);

escola.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/home/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			}
		}
	});

	$stateProvider.state('reports1', {
		url: '/reports1/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports1.html',
				controller: 'Report1Ctrl'
			}
		}
	});

	$stateProvider.state('reports2', {
		url: '/reports2/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports2.html',
				controller: 'Report2Ctrl'
			}
		}
	});

	$stateProvider.state('reports3', {
		url: '/reports3/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports3.html',
				controller: 'Report3Ctrl'
			}
		}
	});

	$stateProvider.state('courses', {
		url: '/courses/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/courses.html',
				controller: 'CourseCtrl'
			}
		}
	});

	$stateProvider.state('courses-form', {
		url: '/courses-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/courses-form.html',
				controller: 'CourseFormCtrl'
			}
		}
	});

	$stateProvider.state('classes', {
		url: '/classes/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/classes.html',
				controller: 'ClasseCtrl'
			}
		}
	});

	$stateProvider.state('classes-form', {
		url: '/classes-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/classes-form.html',
				controller: 'ClasseFormCtrl'
			}
		}
	});

	$stateProvider.state('holidays', {
		url: '/holidays/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/holidays.html',
				controller: 'HolidayCtrl'
			}
		}
	});

	$stateProvider.state('holidays-form', {
		url: '/holidays-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/holidays-form.html',
				controller: 'HolidayFormCtrl'
			}
		}
	});

	$stateProvider.state('modules', {
		url: '/modules/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/modules.html',
				controller: 'ModulesCtrl'
			}
		}
	});

	$stateProvider.state('modules-form', {
		url: '/modules-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/modules-form.html',
				controller: 'ModulesFormCtrl'
			}
		}
	})

	$stateProvider.state('lessons', {
		url: '/lessons/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/lessons.html',
				controller: 'LessonsCtrl'
			}
		}
	});

	$stateProvider.state('lessons-form', {
		url: '/lessons-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/lessons-form.html',
				controller: 'LessonsFormCtrl'
			}
		}
	})

	$stateProvider.state('disciplines', {
		url: '/disciplines/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/disciplines.html',
				controller: 'DisciplineCtrl'
			}
		}
	});

	$stateProvider.state('disciplines-form', {
		url: '/disciplines-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/disciplines-form.html',
				controller: 'DisciplineFormCtrl'
			}
		}
	});

	$stateProvider.state('teachers', {
		url: '/teachers/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/teachers.html',
				controller: 'TeacherCtrl'
			}
		}
	});

	$stateProvider.state('teachers-form', {
		url: '/teachers-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/teachers-form.html',
				controller: 'TeacherFormCtrl'
			}
		}
	});

	$stateProvider.state('students', {
		url: '/students/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/students.html',
				controller: 'StudentCtrl'
			}
		}
	});

	$stateProvider.state('students-form', {
		url: '/students-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/students-form.html',
				controller: 'StudentFormCtrl'
			}
		}
	});

	$stateProvider.state('rooms', {
		url: '/rooms/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/rooms.html',
				controller: 'RoomsCtrl'
			}
		}
	});

	$stateProvider.state('rooms-form', {
		url: '/rooms-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/rooms-form.html',
				controller: 'RoomsFormCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('/reports1/');
	jQuery('#wrapper, #page-wrapper').css('min-height', jQuery(window).height());
});
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
appServices.factory('Report1Service', ['GlobalService',
	function(GlobalService) {
		var reports = [];
		var database = GlobalService.database;
		var db = null;

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				reports.push({
					name: cursor.value.name
				});

				cursor.continue();
			}
		}

		return {
			reports: reports
		}
	}
]);
appServices.factory('Report2Service', ['GlobalService',
	function(GlobalService) {
		var reports = [];
		var database = GlobalService.database;
		var db = null;

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				reports.push({
					name: cursor.value.name
				});

				cursor.continue();
			}
		}

		return {
			reports: reports
		}
	}
]);
appServices.factory('Report3Service', ['GlobalService',
	function(GlobalService) {
		var reports = [];
		var database = GlobalService.database;
		var db = null;

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				reports.push({
					name: cursor.value.name
				});

				cursor.continue();
			}
		}

		return {
			reports: reports
		}
	}
]);
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
appServices.factory('Utils', ['$window',
	function($window) {
		function parseDate(strDate) {
			strDate = strDate.split('/');
			return new Date(strDate[2], (~~strDate[1]) - 1, strDate[0]);
		};

		function getMonthName(month) {
			if (month === 0) {
				month = 'Janeiro';
			}

			if (month === 1) {
				month = 'Fevereiro';
			}

			if (month === 2) {
				month = 'Março';
			}

			if (month === 3) {
				month = 'Abril';
			}

			if (month === 4) {
				month = 'Maio';
			}

			if (month === 5) {
				month = 'Junho';
			}

			if (month === 6) {
				month = 'Julho';
			}

			if (month === 7) {
				month = 'Agosto';
			}

			if (month === 8) {
				month = 'Setembro';
			}

			if (month === 9) {
				month = 'Outubro';
			}

			if (month === 10) {
				month = 'Novembro';
			}

			if (month === 11) {
				month = 'Dezembro';
			}

			return month;
		};

		function getWeekName(weekDay) {
			console.log(weekDay)
			if (weekDay === 0) {
				weekDay = 'sunday';
			}

			if (weekDay === 1) {
				weekDay = 'monday';
			}

			if (weekDay === 2) {
				weekDay = 'tuesday';
			}

			if (weekDay === 3) {
				weekDay = 'wednesday';
			}

			if (weekDay === 4) {
				weekDay = 'thursday';
			}

			if (weekDay === 5) {
				weekDay = 'friday';
			}

			if (weekDay === 6) {
				weekDay = 'saturday';
			}

			return weekDay;
		};


		return {
			getWeekName: getWeekName,
			getMonthName: getMonthName,
			parseDate: parseDate
		};
	}
]);
escola.controller('AppCtrl', ['$scope', '$rootScope',
	function($scope, $rootScope) {
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
			$scope.sectionName = toState.name.split('.')[0];

			if ($scope.sectionName == 'home') {
				$scope.sectionName = 'Home';
			}

			if ($scope.sectionName == 'reports') {
				$scope.sectionName = 'Relatórios';
			}

			if ($scope.sectionName == 'courses') {
				$scope.sectionName = 'Cursos';
			}

			if ($scope.sectionName == 'classes') {
				$scope.sectionName = 'Turmas';
			}

			if ($scope.sectionName == 'modules') {
				$scope.sectionName = 'Módulos';
			}

			if ($scope.sectionName == 'lessons') {
				$scope.sectionName = 'Aulas';
			}

			if ($scope.sectionName == 'holidays') {
				$scope.sectionName = 'Feriados e Recessos';
			}

			if ($scope.sectionName == 'disciplines') {
				$scope.sectionName = 'Disciplinas';
			}

			if ($scope.sectionName == 'teachers') {
				$scope.sectionName = 'Professores';
			}

			if ($scope.sectionName == 'students') {
				$scope.sectionName = 'Alunos';
			}

			if ($scope.sectionName == 'rooms') {
				$scope.sectionName = 'Salas';
			}
		});
	}
]);
escola.controller('ClasseFormCtrl', ['$scope', '$stateParams', '$rootScope', 'ClasseService', 'CourseService', 'ModulesService', 'GlobalService',
	function($scope, $stateParams, $rootScope, ClasseService, CourseService, ModulesService, GlobalService) {
		ClasseService.listAll();
		$scope.classes = ClasseService.classes;

		ModulesService.listAll();
		$scope.modules = ModulesService.modules;
		CourseService.listAll();
		$scope.courses = CourseService.courses;

		function setCode() {
			var courseAcronym;
			var moduleAcronym;
			var turn = $scope.turn;

			$scope.code = '';

			CourseService.courses.forEach(function(course) {
				if (course.name == $scope.course.name) {
					courseAcronym = course.acronym;
				}
			});

			ModulesService.modules.forEach(function(module) {
				if (module.name == $scope.module.name) {
					moduleAcronym = module.acronym;
				}
			});

			$scope.code = courseAcronym + '.' + turn[0] + '.' + moduleAcronym;
		};

		function getModules() {
			$scope.modules = [];
			makedCourse = $scope.course.name;

			ModulesService.modules.forEach(function(module) {
				module.course.forEach(function(course) {
					if (course.name == makedCourse) {
						$scope.modules.push({
							id: module.id,
							name: module.name
						});
					}
				});
			});
		};

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			ClasseService.get({
				id: $stateParams.id
			}, function(classe) {
				$scope.course = classe.course;
				$scope.module = classe.module;
				console.log($scope.module)
				$scope.turn = classe.turn;
				$scope.code = classe.code;
				$scope.startdate = classe.startdate;
				$scope.enddate = classe.enddate;
				$scope.status = classe.status;
			});
		}

		function update() {
			var course = $scope.course;
			var module = $scope.module;
			var turn = $scope.turn;
			var code = $scope.code;
			var startdate = $scope.startdate;
			var enddate = $scope.enddate;
			var status = $scope.status;

			ClasseService.update({
				key: $stateParams.id,
				course: course,
				module: module,
				turn: turn,
				code: code,
				startdate: startdate,
				enddate: enddate,
				status: status
			});
		};

		$scope.update = update;
		$scope.getModules = getModules;
		$scope.setCode = setCode;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('ClasseCtrl', ['$scope', '$rootScope', 'ClasseService', 'CourseService', 'ModulesService', 'GlobalService',
	function($scope, $rootScope, ClasseService, CourseService, ModulesService, GlobalService) {
		ClasseService.listAll();
		$scope.classes = ClasseService.classes;

		ModulesService.listAll();
		$scope.modules = [];
		CourseService.listAll();
		$scope.courses = CourseService.courses;

		function setCode() {
			var courseAcronym;
			var moduleAcronym;
			var turn = $scope.turn;

			$scope.code = '';

			CourseService.courses.forEach(function(course) {
				if (course.name == $scope.course.name) {
					courseAcronym = course.acronym;
				}
			});

			ModulesService.modules.forEach(function(module) {
				if (module.name == $scope.module.name) {
					moduleAcronym = module.acronym;
				}
			});

			$scope.code = courseAcronym + '.' + turn[0] + '.' + moduleAcronym;
		};

		function getModules() {
			$scope.modules = [];
			makedCourse = $scope.course.name;

			ModulesService.modules.forEach(function(module) {
				module.course.forEach(function(course) {
					if (course.name == makedCourse) {
						$scope.modules.push({
							id: module.id,
							name: module.name
						});
					}
				});
			});
		};

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var course = $scope.course;
			var module = $scope.module;
			var turn = $scope.turn;
			var code = $scope.code;
			var startdate = $scope.startdate;
			var enddate = $scope.enddate;
			var status = $scope.status

			ClasseService.insert({
				course: course,
				module: module,
				turn: turn,
				code: code,
				startdate: startdate,
				enddate: enddate,
				status: status
			}, function(obj) {
				$scope.classes.push(obj);
			});

			$scope.course = '';
			$scope.module = '';
			$scope.turn = '';
			$scope.code = '';
			$scope.startdate = '';
			$scope.enddate = '';
			$scope.status = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				ClasseService.remove(id);

				$scope.classes.forEach(function(classe, index) {
					if (classe.id == id) {
						$scope.classes.splice(index, 1);
					}
				});
			}
		};

		$scope.add = add;
		$scope.remove = remove;
		$scope.getModules = getModules;
		$scope.setCode = setCode;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('CourseFormCtrl', ['$scope', '$stateParams', '$rootScope', 'CourseService', 'GlobalService',
	function($scope, $stateParams, $rootScope, CourseService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			CourseService.get({
				id: $stateParams.id
			}, function(course) {
				$scope.name = course.name,
					$scope.acronym = course.acronym
			});
		}

		function update() {
			var name = $scope.name;
			var acronym = $scope.acronym;

			CourseService.update({
				key: $stateParams.id,
				name: name,
				acronym: acronym
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('CourseCtrl', ['$scope', '$rootScope', 'CourseService', 'GlobalService',
	function($scope, $rootScope, CourseService, GlobalService) {
		CourseService.listAll();
		$scope.courses = CourseService.courses;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var acronym = $scope.acronym;

			CourseService.insert({
				name: name,
				acronym: acronym,
			}, function(obj) {
				$scope.courses.push(obj)
			});

			$scope.name = '';
			$scope.acronym = '';
		}

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				CourseService.remove(id);

				$scope.courses.forEach(function(course, index) {
					if (course.id == id) {
						$scope.courses.splice(index, 1);
					}
				});
			}
		}

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('DisciplineFormCtrl', ['$scope', '$rootScope', '$stateParams', 'ModulesService', 'TeacherService', 'DisciplineService', 'GlobalService',
	function($scope, $rootScope, $stateParams, ModulesService, TeacherService, DisciplineService, GlobalService) {
		DisciplineService.listAll();
		$scope.disciplines = DisciplineService.disciplines;
		ModulesService.listAll();
		TeacherService.listAll();

		function getModules() {
			if (!ModulesService.modules) {
				setTimeout(getModules, 100);
				return;
			}
			$scope.modules = ModulesService.modules;
		};

		function getTeacher() {
			if (!TeacherService.teachers) {
				setTimeout(getTeacher, 100);
				return;
			}

			$scope.teachers = TeacherService.teachers;
		};

		getModules();
		getTeacher();

		if ($stateParams.id) {
			DisciplineService.get({
				id: $stateParams.id
			}, function(discipline) {
				$scope.name = discipline.name;
				$scope.module = discipline.module;
				$scope.teacher = discipline.teacher;
			});
		}

		function update() {
			alert(1)
			var name = $scope.name;
			var module = $scope.module;
			var teacher = $scope.teacher;

			DisciplineService.update({
				key: $stateParams.id,
				name: name,
				module: module,
				teacher: teacher
			});
		};

		$scope.update = update;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('DisciplineCtrl', ['$scope', '$rootScope', 'ModulesService', 'TeacherService', 'DisciplineService', 'GlobalService',
	function($scope, $rootScope, ModulesService, TeacherService, DisciplineService, GlobalService) {
		DisciplineService.listAll();
		$scope.disciplines = DisciplineService.disciplines;
		ModulesService.listAll();
		TeacherService.listAll();

		function getModules() {
			if (!ModulesService.modules) {
				setTimeout(getModules, 100);
				return;
			}
			$scope.modules = ModulesService.modules;
		};

		function getTeacher() {
			if (!TeacherService.teachers) {
				setTimeout(getTeacher, 100);
				return;
			}

			$scope.teachers = TeacherService.teachers;
		};

		getModules();
		getTeacher();

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var module = $scope.module;
			var teacher = $scope.teacher;

			DisciplineService.insert({
				name: name,
				module: module,
				teacher: teacher
			}, function(obj) {
				$scope.disciplines.push(obj)
			});

			$scope.name = '';
			$scope.module = '';
			$scope.teacher = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				DisciplineService.remove(id);

				$scope.disciplines.forEach(function(discipline, index) {
					if (discipline.id == id) {
						$scope.disciplines.splice(index, 1);
					}
				});
			}
		};

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('HolidayFormCtrl', ['$scope', '$stateParams', '$rootScope', 'HolidayService', 'GlobalService',
	function($scope, $stateParams, $rootScope, HolidayService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			HolidayService.get({
				id: $stateParams.id
			}, function(holiday) {
				$scope.name = holiday.name;
				$scope.date = holiday.date
			});
		}

		function update() {
			var name = $scope.name;
			var date = $scope.date;

			HolidayService.update({
				key: $stateParams.id,
				name: name,
				date: date
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('HolidayCtrl', ['$scope', '$rootScope', 'HolidayService', 'GlobalService',
	function($scope, $rootScope, HolidayService, GlobalService) {
		HolidayService.listAll();
		$scope.holidays = HolidayService.holidays;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var date = $scope.date;

			HolidayService.insert({
				name: name,
				date: date
			}, function(obj) {
				$scope.holidays.push(obj);
			});

			$scope.name = '';
			$scope.date = '';
		}

		function remove(id) {
			HolidayService.remove(id);

			$scope.holidays.forEach(function(holiday, index) {
				if (holiday.id == id) {
					$scope.holidays.splice(index, 1);
				}
			});
		}

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('LessonsFormCtrl', ['$scope', '$stateParams', '$rootScope', 'ClasseService', 'RoomsService', 'TeacherService', 'HolidayService', 'LessonsService', 'GlobalService',
	function($scope, $stateParams, $rootScope, ClasseService, RoomsService, TeacherService, HolidayService, LessonsService, GlobalService) {
		ClasseService.listAll();
		RoomsService.listAll();
		TeacherService.listAll();

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			LessonsService.get({
				id: $stateParams.id
			}, function(lesson) {
				console.log(lesson.room)
				$scope.date = lesson.date;
				$scope.hour = lesson.hour;
				$scope.classe = lesson.classe;
				$scope.room = lesson.room;
				$scope.teacher = lesson.teacher;
			});
		}

		function update() {
			var date = $scope.date;
			var hour = $scope.hour;
			var classe = $scope.classe;
			var room = $scope.room;
			var teacher = $scope.teacher;

			LessonsService.update({
				key: $stateParams.id,
				date: date,
				hour: hour,
				classe: classe,
				room: room,
				teacher: teacher
			});
		};

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			$scope.classes = ClasseService.classes;
		};

		function getRooms() {
			if (!RoomsService.rooms) {
				setTimeout(getRooms, 100);
				return;
			}

			$scope.rooms = RoomsService.rooms;
		};

		function getTeachers() {
			if (!TeacherService.teachers) {
				setTimeout(getTeachers, 100);;
				return;
			}

			$scope.teachers = TeacherService.teachers;
		};

		getClasses();
		getRooms();
		getTeachers();

		$scope.getRooms = getRooms;
		$scope.getTeachers = getTeachers;
		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('LessonsCtrl', ['$scope', '$rootScope', 'ClasseService', 'RoomsService', 'TeacherService', 'HolidayService', 'LessonsService', 'GlobalService',
	function($scope, $rootScope, ClasseService, RoomsService, TeacherService, HolidayService, LessonsService, GlobalService) {
		var holidays = [];
		LessonsService.listAll();

		ClasseService.listAll();
		RoomsService.listAll();
		TeacherService.listAll();
		HolidayService.listAll();
		$scope.lessons = LessonsService.lessons;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			$scope.classes = ClasseService.classes;
		};

		function getRooms() {
			if (!RoomsService.rooms) {
				setTimeout(getRooms, 100);
				return;
			}
			$scope.rooms = RoomsService.rooms;
		};

		function getTeachers() {
			if (!TeacherService.teachers) {
				setTimeout(getTeachers, 100);;
				return;
			}

			$scope.teachers = TeacherService.teachers;
		};

		function getHolidays() {
			if (!HolidayService.holidays) {
				setTimeout(getHolidays, 100);
				return
			}

			holidays = HolidayService.holidays;
		};

		getClasses();
		getHolidays();

		function generate() {
			var startdate = $scope.startdate;
			var lessonamount = $scope.lessonamount;
			var weekdays = $scope.weekdays;
			var hour = $scope.hour;
			var classe = $scope.classe;
			var room = $scope.room;
			var teacher = $scope.teacher;

			var arrayStartDate = startdate.split("/");
			var day = parseInt(arrayStartDate[0]);
			var month = parseInt(arrayStartDate[1]);
			var year = parseInt(arrayStartDate[2]);
			var markedDay = Date.today().set({
				day: day,
				month: month - 1,
				year: year
			});

			var afterDays = [];
			var beforeDays = [];
			var nowDay = [];

			weekdays.forEach(function(weekday) {
				if (Date.getDayNumberFromName(weekday) > markedDay.getDay()) {
					afterDays.push(weekday)
				}

				if (Date.getDayNumberFromName(weekday) < markedDay.getDay()) {
					beforeDays.push(weekday)
				}

				if (Date.getDayNumberFromName(weekday) == markedDay.getDay()) {
					nowDay.unshift(weekday)
				}
			});

			weekdays = [];
			weekdays = afterDays.concat(beforeDays)
			weekdays = weekdays.concat(nowDay)

			var infiniteWeekDays = [];
			var infinite = lessonamount * lessonamount;
			for (var i = 0; i < infinite; i++) {
				weekdays.forEach(function(weekday) {
					infiniteWeekDays.push(weekday)
				});
			}

			var insertToday = false;
			weekdays.forEach(function(weekday) {
				if (markedDay.getDay() == Date.getDayNumberFromName(weekday)) {
					insertToday = true;
				}
			});

			var nextLesson;
			var nextLessons = [];
			var date;
			var id = 0;
			weekdayIndex = 0;
			weekday = infiniteWeekDays[weekdayIndex];

			for (var i = 0; i < lessonamount; i++) {
				arrayStartDate = startdate.split("/");
				var day = parseInt(arrayStartDate[0]);
				var month = parseInt(arrayStartDate[1]);
				var year = parseInt(arrayStartDate[2]);
				++id;

				if (insertToday) {
					nextLesson = Date.today().set({
						day: day,
						month: month - 1,
						year: year
					});

					date = nextLesson.toString("dd/MM/yyyy")

					todayIsHoliday = false;

					if (holidays) {
						holidays.forEach(function(holiday) {
							if (holiday.date == date) {

								todayIsHoliday = true;
								nextWeekday();

								function nextWeekday() {
									++weekdayIndex;
									nextLesson = Date.today().set({
										day: day,
										month: month - 1,
										year: year
									}).next()[weekday]();

									date = nextLesson.toString("dd/MM/yyyy")

									holidays.forEach(function(holiday) {
										if (holiday.date == date) {
											nextWeekday();
										}
									});
									todayIsHoliday = false;
								};
							}
						});
					}

					if (!todayIsHoliday) {
						nextLessons.push({
							id: id,
							date: date,
							hour: hour,
							classe: classe,
							room: room,
							teacher: teacher
						});
					}

					++id;
					insertToday = false
				}

				if (!insertToday) {
					weekday = infiniteWeekDays[weekdayIndex];
					nextLesson = Date.today().set({
						day: day,
						month: month - 1,
						year: year
					}).next()[weekday]();

					date = nextLesson.toString("dd/MM/yyyy")

					todayIsHoliday = false;

					if (holidays) {
						holidays.forEach(function(holiday) {
							if (holiday.date == date) {

								todayIsHoliday = true;
								nextWeekday();

								function nextWeekday() {
									weekday = infiniteWeekDays[weekdayIndex];
									nextLesson = Date.today().set({
										day: day,
										month: month - 1,
										year: year
									}).next()[weekday]();

									date = nextLesson.toString("dd/MM/yyyy")

									holidays.forEach(function(holiday) {
										if (holiday.date == date) {
											++weekdayIndex;
											nextWeekday();
										} else {

											if (weekdayIndex == 0) {
												++weekdayIndex;
											}
										}
									});
									todayIsHoliday = false;
								};
							}
						});
					}
					startdate = date;
					++weekdayIndex;
					insertToday = false
					if (!todayIsHoliday) {
						nextLessons.push({
							id: id,
							date: date,
							hour: hour,
							classe: classe,
							room: room,
							teacher: teacher
						});
					}
				}
			};

			LessonsService.generate(nextLessons, function(objs) {
				objs.forEach(function(obj) {
					$scope.lessons.push(obj)
				});
			});

			$scope.startdate = '';
			$scope.lessonamount = '';
			$scope.weekdays = '';
			$scope.hour = '';
			$scope.classe = '';
			$scope.room = '';
			$scope.teacher = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				LessonsService.remove(id);

				$scope.lessons.forEach(function(lesson, index) {
					if (lesson.id == id) {
						$scope.lessons.splice(index, 1);
					}
				});
			}

		};

		$scope.generate = generate;
		$scope.remove = remove;
		$scope.getRooms = getRooms;
		$scope.getTeachers = getTeachers;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('ModulesFormCtrl', ['$scope', '$stateParams', '$rootScope', 'ModulesService', 'CourseService', 'GlobalService',
	function($scope, $stateParams, $rootScope, ModulesService, CourseService, GlobalService) {
		CourseService.listAll();
		$scope.courses = CourseService.courses;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			ModulesService.get({
				id: $stateParams.id
			}, function(module) {
				$scope.name = module.name,
					$scope.acronym = module.acronym
			});
		}

		function update() {
			var name = $scope.name;
			var course = $scope.course;
			var acronym = $scope.acronym;

			ModulesService.update({
				key: $stateParams.id,
				name: name,
				course: course,
				acronym: acronym
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('ModulesCtrl', ['$scope', '$rootScope', 'ModulesService', 'CourseService', 'GlobalService',
	function($scope, $rootScope, ModulesService, CourseService, GlobalService) {
		ModulesService.listAll();
		$scope.courses = CourseService.courses;
		$scope.modules = ModulesService.modules;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var course = $scope.course;
			var acronym = $scope.acronym;

			ModulesService.insert({
				name: name,
				course: course,
				acronym: acronym
			}, function(obj) {
				$scope.modules.push(obj);
			});

			$scope.name = '';
			$scope.course = '';
			$scope.acronym = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				ModulesService.remove(id);

				$scope.modules.forEach(function(module, index) {
					if (module.id == id) {
						$scope.modules.splice(index, 1);
					}
				});
			}

		};

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('Report1Ctrl', ['$scope', '$rootScope', 'ClasseService', 'LessonsService', 'Report1Service', 'GlobalService',
	function($scope, $rootScope, ClasseService, LessonsService, ReportService, GlobalService) {
		$scope.reports = [];
		$scope.monthly = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			$scope.reports = ClasseService.classes;
		};

		function haveLessons(month, report) {
			var startdate = report.startdate.split("/");
			var startmonth = parseInt(startdate[1]);
			var enddate = report.enddate.split("/");
			var enddmonth = parseInt(enddate[1]);

			if (month == startmonth - 1) {
				return true;
			}

			if (month > startmonth - 1 && month < enddmonth - 1) {
				return true;
			}

			if (month == enddmonth - 1) {
				return true;
			}
		};

		function exportpdf() {
			var pdf = new jsPDF('l', 'pt', 'a4');
			var options = {
				letterRendering: true,
				useCORS: true,
				allowTaint: true,
				background: 'E1E1E1'
			};

			pdf.addHTML(angular.element('#report'), 0, 15, options, function() {
				pdf.save("pdf.pdf");
			});
		};

		getClasses();

		$scope.exportpdf = exportpdf;
		$scope.print = print;
		$scope.haveLessons = haveLessons;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('Report2Ctrl', ['$scope', '$rootScope', 'ClasseService', 'StudentService', 'Report2Service', 'GlobalService',
	function($scope, $rootScope, ClasseService, StudentService, ReportService, GlobalService) {
		var allClasses = [];
		var allStudents = [];

		$scope.reports = [];

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			allClasses = ClasseService.classes;
		};

		getClasses();

		function getStudents() {
			var total = {};

			if (!StudentService.students) {
				setTimeout(getStudents, 100);
				return;
			}

			allStudents = StudentService.students;
			studentsByClasse = [];

			allClasses.forEach(function(classe) {
				var studentByClasse = 0;
				var moduleByClasse = 0;

				allStudents.forEach(function(student) {
					if (classe.classcode == student.classe.classcode) {
						if (classe.status == "Aberto") {
							++studentByClasse;
							++moduleByClasse;
						}
					}
				});

				if (studentByClasse > 0 && moduleByClasse > 0) {
					if (!total[classe.module.name]) {
						total[classe.module.name] = {
							name: classe.module.name,
							student: 0,
							classes: 0
						}
					}

					if (total[classe.module.name]) {
						total[classe.module.name].classes++;
						total[classe.module.name].student += studentByClasse;
					}
				}
			});

			$scope.reports = Object.keys(total).map(function(key) {
				return total[key];
			});
		};

		getStudents();

		function exportpdf() {
			var pdf = new jsPDF('l', 'pt', 'a4');
			var options = {
				letterRendering: true,
				useCORS: true,
				allowTaint: true,
				background: 'E1E1E1',
				width: 9000,
				zoomMode: 1.2,
				height: 9000
			};

			angular.element('#report').addClass('report2');
			pdf.addHTML(angular.element('#report'), 0, 15, options, function() {
				pdf.save("pdf.pdf");
				angular.element('#report').removeClass('report2');
			});
		};

		$scope.exportpdf = exportpdf;
		$scope.print = print;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('Report3Ctrl', ['$scope', '$rootScope', 'LessonsService', 'ClasseService', 'Report3Service', 'Utils', 'GlobalService',
	function($scope, $rootScope, LessonsService, ClasseService, ReportService, Utils, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		var allLessons = [];
		var monthHeader = [];
		var months = [];
		LessonsService.listAll();
		ClasseService.listAll();
		$scope.allClasses = ClasseService.classes;

		function getLessons() {
			if (!LessonsService.lessons.length) {
				setTimeout(getLessons, 100);
				return;
			}

			allLessons = [];

			LessonsService.lessons.forEach(function(lesson) {
				allLessons.push({
					hour: lesson.hour,
					date: Utils.parseDate(lesson.date),
					teacher: lesson.teacher.name,
					className: lesson.classe.code
				});
			});
			filterByClass(allLessons, $scope.classeName.code);
		};

		function getRangeMonths(lessons) {
			months = [];
			monthHeader = [];

			var monthBetweenDates;
			var min = _.min(lessons, function(lesson) {
				return lesson.date.getFullYear() + lesson.date.getMonth();
			});

			var max = _.max(lessons, function(lesson) {
				return lesson.date.getFullYear() + lesson.date.getMonth();
			});

			max = max.date.getMonth();
			min = min.date.getMonth();

			if (max < min) {
				max = max + 12;
			}

			monthBetweenDates = max - min + 1;
			min = min - 1;

			for (var i = monthBetweenDates; i > 0; i--) {
				min++
				months.push(min);
				monthHeader.push(Utils.getMonthName(min));
			};

			$scope.monthHeader = monthHeader;
			groupByTeacher(lessons);
		};

		function filterByClass(lessons, classeName) {
			var filter;
			filter = _.filter(lessons, function(lesson) {
				return lesson.className == classeName;
			});
			getRangeMonths(filter);
		};

		function groupByTeacher(lessons) {
			var teachers;

			teachers = _.groupBy(lessons, function(lesson) {
				return lesson.teacher;
			});

			groupByDayWeek(teachers);
		};

		function groupByDayWeek(teachers) {
			var rows = [];

			Object.keys(teachers).forEach(function(teacher) {
				rows.push({
					teacher: teacher,
					hour: teachers[teacher][0].hour,
					lessons: resolveLessons(teachers[teacher])
				});
			});

			$scope.rows = rows;
		};

		function resolveLessons(lessons) {
			var lessonsDate = [];
			var weekName = lessons[0].date.getDayName().toLowerCase();

			lessons = _.sortBy(lessons, function(n) {
				return lessons.date;
			});

			months.forEach(function(month) {
				var initMonth = new Date(2015, month, 1);
				var lastMonth = new Date(2015, month + 1, 0);

				initMonth = initMonth.next()[weekName]();
				lastMonth = lastMonth.prev()[weekName]();

				while (lastMonth >= initMonth) {
					var hasLesson = '';

					lessons.forEach(function(lesson) {
						if (haveLesson(lesson.date, initMonth)) {
							hasLesson = lesson.date.getDate();
						}
					});

					lessonsDate.push(hasLesson);
					initMonth = initMonth.next()[weekName]();
				};
			});

			return lessonsDate;
		};

		function haveLesson(date1, date2) {
			return (date1.toISOString() === date2.toISOString());
		};


		// function exportpdf() {
		// 	var pdf = new jsPDF('l', 'pt', 'a4');
		// 	var options = {
		// 		letterRendering: true,
		// 		useCORS: true,
		// 		allowTaint: true,
		// 		background: 'E1E1E1',
		// 		width: 9000,
		// 		zoomMode: 1.2,
		// 		height: 9000
		// 	};

		// 	angular.element('#report').addClass('report2');
		// 	pdf.addHTML(angular.element('#report'), 0, 15, options, function() {
		// 		pdf.save("pdf.pdf");
		// 		angular.element('#report').removeClass('report2');
		// 	});
		// };

		// $scope.exportpdf = exportpdf;
		// $scope.print = print;
		$scope.getLessons = getLessons;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('RoomsFormCtrl', ['$scope', '$stateParams', '$rootScope', 'RoomsService', 'GlobalService',
	function($scope, $stateParams, $rootScope, RoomsService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			RoomsService.get({
				id: $stateParams.id
			}, function(room) {
				console.log(room)
				$scope.name = room.name,
					$scope.capacity = room.capacity
			});
		}

		function update() {
			var name = $scope.name;
			var capacity = $scope.capacity;

			RoomsService.update({
				key: $stateParams.id,
				name: name,
				capacity: capacity
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('RoomsCtrl', ['$scope', '$rootScope', 'RoomsService', 'GlobalService',
	function($scope, $rootScope, RoomsService, GlobalService) {
		RoomsService.listAll();
		$scope.rooms = RoomsService.rooms;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var capacity = $scope.capacity;

			RoomsService.insert({
				name: name,
				capacity: capacity
			}, function(obj) {
				$scope.rooms.push(obj)
			});

			$scope.name = '';
			$scope.capacity = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				RoomsService.remove(id);

				$scope.rooms.forEach(function(room, index) {
					if (room.id == id) {
						$scope.rooms.splice(index, 1);
					}
				});
			}
		};

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('StudentCtrl', ['$scope', '$rootScope', 'CourseService', 'ClasseService', 'StudentService', 'GlobalService',
	function($scope, $rootScope, CourseService, ClasseService, StudentService, GlobalService) {
		$scope.students = StudentService.students;
		$scope.courses = CourseService.courses;
		$scope.classes = [];

		function getClasses() {
			ClasseService.classes.forEach(function(classe) {
				if (classe.course.name == $scope.course.name) {
					$scope.classes.push({
						id: classe.id,
						classcode: classe.classcode
					});
				}
			});
		}

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var course = $scope.course;
			var classe = $scope.classe;

			StudentService.insert({
				name: name,
				course: course,
				classe: classe
			}, function(obj) {
				$scope.students.push(obj)
			});

			$scope.name = '';
			$scope.course = '';
			$scope.classe = '';
		}

		function remove(id) {
			StudentService.remove(id);

			$scope.students.forEach(function(student, index) {
				if (student.id == id) {
					$scope.students.splice(index, 1);
				}
			});
		}

		$scope.add = add;
		$scope.remove = remove;
		$scope.getClasses = getClasses;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('TeacherFormCtrl', ['$scope', '$stateParams', '$rootScope', 'TeacherService', 'GlobalService',
	function($scope, $stateParams, $rootScope, TeacherService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			TeacherService.get({
				id: $stateParams.id
			}, function(teacher) {
				$scope.name = teacher.name
			});
		}

		function update() {
			var name = $scope.name;

			TeacherService.update({
				key: $stateParams.id,
				name: name
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);
escola.controller('TeacherCtrl', ['$scope', '$rootScope', 'TeacherService', 'GlobalService',
	function($scope, $rootScope, TeacherService, GlobalService) {
		TeacherService.listAll();
		$scope.teachers = TeacherService.teachers;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;

			TeacherService.insert({
				name: name
			}, function(obj) {
				$scope.teachers.push(obj)
			});

			$scope.name = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				TeacherService.remove(id);

				$scope.teachers.forEach(function(teacher, index) {
					if (teacher.id == id) {
						$scope.teachers.splice(index, 1);
					}
				});
			}
		};

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);