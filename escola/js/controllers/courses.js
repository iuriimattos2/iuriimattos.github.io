escola.controller('CourseCtrl', ['$scope', '$rootScope', 'CourseService', 'GlobalService',
	function($scope, $rootScope, CourseService, GlobalService) {
		CourseService.listAll();
		$scope.courses = CourseService.courses;

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var acronym = $scope.acronym;

			CourseService.insert({
				name: name,
				acronym: acronym,
			}, function(obj) {
				$scope.courses.push(obj)
			});

			$scope.name = '';
			$scope.acronym = '';
		}

		function remove(id) {
			var accept = confirm("Você tem certeza que deseja excluir este registro?")
			if (accept) {
				CourseService.remove(id);

				$scope.courses.forEach(function(course, index) {
					if (course.id == id) {
						$scope.courses.splice(index, 1);
					}
				});
			}
		}

		$scope.add = add;
		$scope.remove = remove;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);