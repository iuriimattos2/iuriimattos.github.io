escola.controller('StudentCtrl', ['$scope', '$rootScope', 'CourseService', 'ClasseService', 'StudentService', 'GlobalService',
	function($scope, $rootScope, CourseService, ClasseService, StudentService, GlobalService) {
		$scope.students = StudentService.students;
		$scope.courses = CourseService.courses;
		$scope.classes = [];

		function getClasses() {
			ClasseService.classes.forEach(function(classe) {
				if (classe.course.name == $scope.course.name) {
					$scope.classes.push({
						id: classe.id,
						classcode: classe.classcode
					});
				}
			});
		}

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function add() {
			var name = $scope.name;
			var course = $scope.course;
			var classe = $scope.classe;

			StudentService.insert({
				name: name,
				course: course,
				classe: classe
			}, function(obj) {
				$scope.students.push(obj)
			});

			$scope.name = '';
			$scope.course = '';
			$scope.classe = '';
		}

		function remove(id) {
			StudentService.remove(id);

			$scope.students.forEach(function(student, index) {
				if (student.id == id) {
					$scope.students.splice(index, 1);
				}
			});
		}

		$scope.add = add;
		$scope.remove = remove;
		$scope.getClasses = getClasses;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);