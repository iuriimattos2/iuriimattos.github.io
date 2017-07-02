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