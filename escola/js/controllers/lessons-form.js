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