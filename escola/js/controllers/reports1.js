escola.controller('Report1Ctrl', ['$scope', '$rootScope', 'ClasseService', 'LessonsService', 'Report1Service', 'GlobalService',
	function($scope, $rootScope, ClasseService, LessonsService, ReportService, GlobalService) {
		$scope.reports = [];
		$scope.monthly = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		setInterval(function() {
			$scope.$digest();
		}, 500);

		function getClasses() {
			if (!ClasseService.classes) {
				setTimeout(getClasses, 100);
				return;
			}

			$scope.reports = ClasseService.classes;
		};

		function haveLessons(month, report) {
			var startdate = report.startdate.split("/");
			var startmonth = parseInt(startdate[1]);
			var enddate = report.enddate.split("/");
			var enddmonth = parseInt(enddate[1]);

			if (month == startmonth - 1) {
				return true;
			}

			if (month > startmonth - 1 && month < enddmonth - 1) {
				return true;
			}

			if (month == enddmonth - 1) {
				return true;
			}
		};

		function exportpdf() {
			var pdf = new jsPDF('l', 'pt', 'a4');
			var options = {
				letterRendering: true,
				useCORS: true,
				allowTaint: true,
				background: 'E1E1E1'
			};

			pdf.addHTML(angular.element('#report'), 0, 15, options, function() {
				pdf.save("pdf.pdf");
			});
		};

		getClasses();

		$scope.exportpdf = exportpdf;
		$scope.print = print;
		$scope.haveLessons = haveLessons;

		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			$scope.menuActive = toState.name.split('.')[0];
		});
	}
]);