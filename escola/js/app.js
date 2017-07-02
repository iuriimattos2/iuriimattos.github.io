var escola = angular.module('escola', ['appServices', 'ui.router']),
	appServices = angular.module('appServices', ['ngResource']);

escola.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url: '/home/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			}
		}
	});

	$stateProvider.state('reports1', {
		url: '/reports1/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports1.html',
				controller: 'Report1Ctrl'
			}
		}
	});

	$stateProvider.state('reports2', {
		url: '/reports2/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports2.html',
				controller: 'Report2Ctrl'
			}
		}
	});

	$stateProvider.state('reports3', {
		url: '/reports3/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/reports3.html',
				controller: 'Report3Ctrl'
			}
		}
	});

	$stateProvider.state('courses', {
		url: '/courses/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/courses.html',
				controller: 'CourseCtrl'
			}
		}
	});

	$stateProvider.state('courses-form', {
		url: '/courses-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/courses-form.html',
				controller: 'CourseFormCtrl'
			}
		}
	});

	$stateProvider.state('classes', {
		url: '/classes/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/classes.html',
				controller: 'ClasseCtrl'
			}
		}
	});

	$stateProvider.state('classes-form', {
		url: '/classes-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/classes-form.html',
				controller: 'ClasseFormCtrl'
			}
		}
	});

	$stateProvider.state('holidays', {
		url: '/holidays/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/holidays.html',
				controller: 'HolidayCtrl'
			}
		}
	});

	$stateProvider.state('holidays-form', {
		url: '/holidays-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/holidays-form.html',
				controller: 'HolidayFormCtrl'
			}
		}
	});

	$stateProvider.state('modules', {
		url: '/modules/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/modules.html',
				controller: 'ModulesCtrl'
			}
		}
	});

	$stateProvider.state('modules-form', {
		url: '/modules-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/modules-form.html',
				controller: 'ModulesFormCtrl'
			}
		}
	})

	$stateProvider.state('lessons', {
		url: '/lessons/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/lessons.html',
				controller: 'LessonsCtrl'
			}
		}
	});

	$stateProvider.state('lessons-form', {
		url: '/lessons-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/lessons-form.html',
				controller: 'LessonsFormCtrl'
			}
		}
	})

	$stateProvider.state('disciplines', {
		url: '/disciplines/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/disciplines.html',
				controller: 'DisciplineCtrl'
			}
		}
	});

	$stateProvider.state('disciplines-form', {
		url: '/disciplines-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/disciplines-form.html',
				controller: 'DisciplineFormCtrl'
			}
		}
	});

	$stateProvider.state('teachers', {
		url: '/teachers/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/teachers.html',
				controller: 'TeacherCtrl'
			}
		}
	});

	$stateProvider.state('teachers-form', {
		url: '/teachers-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/teachers-form.html',
				controller: 'TeacherFormCtrl'
			}
		}
	});

	$stateProvider.state('students', {
		url: '/students/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/students.html',
				controller: 'StudentCtrl'
			}
		}
	});

	$stateProvider.state('students-form', {
		url: '/students-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/students-form.html',
				controller: 'StudentFormCtrl'
			}
		}
	});

	$stateProvider.state('rooms', {
		url: '/rooms/',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/rooms.html',
				controller: 'RoomsCtrl'
			}
		}
	});

	$stateProvider.state('rooms-form', {
		url: '/rooms-form/:id',
		access: {
			requiredAuthentication: true
		},
		views: {
			'': {
				templateUrl: 'views/rooms-form.html',
				controller: 'RoomsFormCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('/reports1/');
	jQuery('#wrapper, #page-wrapper').css('min-height', jQuery(window).height());
});