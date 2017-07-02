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