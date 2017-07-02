escola.controller('RoomsCtrl', ['$scope', '$rootScope', 'RoomsService', 'GlobalService',
	function($scope, $rootScope, RoomsService, GlobalService) {
		RoomsService.listAll();
		$scope.rooms = RoomsService.rooms;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var capacity = $scope.capacity;

			RoomsService.insert({
				name: name,
				capacity: capacity
			}, function(obj) {
				$scope.rooms.push(obj)
			});

			$scope.name = '';
			$scope.capacity = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				RoomsService.remove(id);

				$scope.rooms.forEach(function(room, index) {
					if (room.id == id) {
						$scope.rooms.splice(index, 1);
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