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