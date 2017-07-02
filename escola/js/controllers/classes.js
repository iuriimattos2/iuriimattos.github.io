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