escola.controller('TeacherCtrl', ['$scope', '$rootScope', 'TeacherService', 'GlobalService',
	function($scope, $rootScope, TeacherService, GlobalService) {
		TeacherService.listAll();
		$scope.teachers = TeacherService.teachers;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;

			TeacherService.insert({
				name: name
			}, function(obj) {
				$scope.teachers.push(obj)
			});

			$scope.name = '';
		};

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				TeacherService.remove(id);

				$scope.teachers.forEach(function(teacher, index) {
					if (teacher.id == id) {
						$scope.teachers.splice(index, 1);
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