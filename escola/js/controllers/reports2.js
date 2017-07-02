escola.controller('Report2Ctrl', ['$scope', '$rootScope', 'ClasseService', 'StudentService', 'Report2Service', 'GlobalService',
	function($scope, $rootScope, ClasseService, StudentService, ReportService, GlobalService) {
		var allClasses = [];
		var allStudents = [];

		$scope.reports = [];

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			allClasses = ClasseService.classes;
		};

		getClasses();

		function getStudents() {
			var total = {};

			if (!StudentService.students) {
				setTimeout(getStudents, 100);
				return;
			}

			allStudents = StudentService.students;
			studentsByClasse = [];

			allClasses.forEach(function(classe) {
				var studentByClasse = 0;
				var moduleByClasse = 0;

				allStudents.forEach(function(student) {
					if (classe.classcode == student.classe.classcode) {
						if (classe.status == "Aberto") {
							++studentByClasse;
							++moduleByClasse;
						}
					}
				});

				if (studentByClasse > 0 && moduleByClasse > 0) {
					if (!total[classe.module.name]) {
						total[classe.module.name] = {
							name: classe.module.name,
							student: 0,
							classes: 0
						}
					}

					if (total[classe.module.name]) {
						total[classe.module.name].classes++;
						total[classe.module.name].student += studentByClasse;
					}
				}
			});

			$scope.reports = Object.keys(total).map(function(key) {
				return total[key];
			});
		};

		getStudents();

		function exportpdf() {
			var pdf = new jsPDF('l', 'pt', 'a4');
			var options = {
				letterRendering: true,
				useCORS: true,
				allowTaint: true,
				background: 'E1E1E1',
				width: 9000,
				zoomMode: 1.2,
				height: 9000
			};

			angular.element('#report').addClass('report2');
			pdf.addHTML(angular.element('#report'), 0, 15, options, function() {
				pdf.save("pdf.pdf");
				angular.element('#report').removeClass('report2');
			});
		};

		$scope.exportpdf = exportpdf;
		$scope.print = print;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);