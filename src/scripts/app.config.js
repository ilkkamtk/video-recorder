angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'scripts/login/loginForm.html',
                controller: 'LoginController'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'scripts/UI/main.html',
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'scripts/login/logout.html',
                controller: 'LogoutController'
            });

        $urlRouterProvider.otherwise("/");
    });