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