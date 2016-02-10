angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'views/loginForm.html',
                controller: 'LoginController'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
            });

        $urlRouterProvider.otherwise("/");
    });