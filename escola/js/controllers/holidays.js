escola.controller('HolidayCtrl', ['$scope', '$rootScope', 'HolidayService', 'GlobalService',
	function($scope, $rootScope, HolidayService, GlobalService) {
		HolidayService.listAll();
		$scope.holidays = HolidayService.holidays;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var date = $scope.date;

			HolidayService.insert({
				name: name,
				date: date
			}, function(obj) {
				$scope.holidays.push(obj);
			});

			$scope.name = '';
			$scope.date = '';
		}

		function remove(id) {
			HolidayService.remove(id);

			$scope.holidays.forEach(function(holiday, index) {
				if (holiday.id == id) {
					$scope.holidays.splice(index, 1);
				}
			});
		}

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);