angular.
	module('app').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider) {
				$locationProvider.hashPrefix('!');

				$routeProvider.
				when ('/main/dogs', {
					template: '<dog-page></dog-page>'
				}).
				otherwise({redirectTo: '/main/dogs'});
			}
		]);
