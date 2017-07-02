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