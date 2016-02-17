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
            .state('view', {
                url: '/view',
                templateUrl: 'scripts/mediaApi/mediaView.html',
                controller: 'MediaViewController'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'scripts/login/logout.html',
                controller: 'LogoutController'
            });

        $urlRouterProvider.otherwise("/");
    });