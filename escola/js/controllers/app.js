escola.controller('AppCtrl', ['$scope', '$rootScope',
	function($scope, $rootScope) {
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
			$scope.sectionName = toState.name.split('.')[0];

			if ($scope.sectionName == 'home') {
				$scope.sectionName = 'Home';
			}

			if ($scope.sectionName == 'reports') {
				$scope.sectionName = 'Relatórios';
			}

			if ($scope.sectionName == 'courses') {
				$scope.sectionName = 'Cursos';
			}

			if ($scope.sectionName == 'classes') {
				$scope.sectionName = 'Turmas';
			}

			if ($scope.sectionName == 'modules') {
				$scope.sectionName = 'Módulos';
			}

			if ($scope.sectionName == 'lessons') {
				$scope.sectionName = 'Aulas';
			}

			if ($scope.sectionName == 'holidays') {
				$scope.sectionName = 'Feriados e Recessos';
			}

			if ($scope.sectionName == 'disciplines') {
				$scope.sectionName = 'Disciplinas';
			}

			if ($scope.sectionName == 'teachers') {
				$scope.sectionName = 'Professores';
			}

			if ($scope.sectionName == 'students') {
				$scope.sectionName = 'Alunos';
			}

			if ($scope.sectionName == 'rooms') {
				$scope.sectionName = 'Salas';
			}
		});
	}
]);