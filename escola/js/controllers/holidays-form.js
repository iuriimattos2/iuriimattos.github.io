escola.controller('HolidayFormCtrl', ['$scope', '$stateParams', '$rootScope', 'HolidayService', 'GlobalService',
	function($scope, $stateParams, $rootScope, HolidayService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			HolidayService.get({
				id: $stateParams.id
			}, function(holiday) {
				$scope.name = holiday.name;
				$scope.date = holiday.date
			});
		}

		function update() {
			var name = $scope.name;
			var date = $scope.date;

			HolidayService.update({
				key: $stateParams.id,
				name: name,
				date: date
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);