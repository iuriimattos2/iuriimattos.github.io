appServices.factory('Utils', ['$window',
	function($window) {
		function parseDate(strDate) {
			strDate = strDate.split('/');
			return new Date(strDate[2], (~~strDate[1]) - 1, strDate[0]);
		};

		function getMonthName(month) {
			if (month === 0) {
				month = 'Janeiro';
			}

			if (month === 1) {
				month = 'Fevereiro';
			}

			if (month === 2) {
				month = 'Março';
			}

			if (month === 3) {
				month = 'Abril';
			}

			if (month === 4) {
				month = 'Maio';
			}

			if (month === 5) {
				month = 'Junho';
			}

			if (month === 6) {
				month = 'Julho';
			}

			if (month === 7) {
				month = 'Agosto';
			}

			if (month === 8) {
				month = 'Setembro';
			}

			if (month === 9) {
				month = 'Outubro';
			}

			if (month === 10) {
				month = 'Novembro';
			}

			if (month === 11) {
				month = 'Dezembro';
			}

			return month;
		};

		function getWeekName(weekDay) {
			console.log(weekDay)
			if (weekDay === 0) {
				weekDay = 'sunday';
			}

			if (weekDay === 1) {
				weekDay = 'monday';
			}

			if (weekDay === 2) {
				weekDay = 'tuesday';
			}

			if (weekDay === 3) {
				weekDay = 'wednesday';
			}

			if (weekDay === 4) {
				weekDay = 'thursday';
			}

			if (weekDay === 5) {
				weekDay = 'friday';
			}

			if (weekDay === 6) {
				weekDay = 'saturday';
			}

			return weekDay;
		};


		return {
			getWeekName: getWeekName,
			getMonthName: getMonthName,
			parseDate: parseDate
		};
	}
]);