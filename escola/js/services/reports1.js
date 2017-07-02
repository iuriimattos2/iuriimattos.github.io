appServices.factory('Report1Service', ['GlobalService',
	function(GlobalService) {
		var reports = [];
		var database = GlobalService.database;
		var db = null;

		function list(e) {
			var cursor = e.target.result;

			if (cursor) {
				reports.push({
					name: cursor.value.name
				});

				cursor.continue();
			}
		}

		return {
			reports: reports
		}
	}
]);