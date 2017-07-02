escola.controller('RoomsFormCtrl', ['$scope', '$stateParams', '$rootScope', 'RoomsService', 'GlobalService',
	function($scope, $stateParams, $rootScope, RoomsService, GlobalService) {

		setInterval(function() {
			$scope.$digest();
		}, 500);

		if ($stateParams.id) {
			RoomsService.get({
				id: $stateParams.id
			}, function(room) {
				console.log(room)
				$scope.name = room.name,
					$scope.capacity = room.capacity
			});
		}

		function update() {
			var name = $scope.name;
			var capacity = $scope.capacity;

			RoomsService.update({
				key: $stateParams.id,
				name: name,
				capacity: capacity
			});
		};

		$scope.update = update;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);