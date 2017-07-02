escola.controller('TeacherFormCtrl', ['$scope', '$stateParams', '$rootScope', 'TeacherService', 'GlobalService',
	function($scope, $stateParams, $rootScope, TeacherService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			TeacherService.get({
				id: $stateParams.id
			}, function(teacher) {
				$scope.name = teacher.name
			});
		}

		function update() {
			var name = $scope.name;

			TeacherService.update({
				key: $stateParams.id,
				name: name
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);