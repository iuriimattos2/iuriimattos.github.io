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