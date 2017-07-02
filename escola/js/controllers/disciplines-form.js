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