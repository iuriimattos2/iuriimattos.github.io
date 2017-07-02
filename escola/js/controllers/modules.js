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