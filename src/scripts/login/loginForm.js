angular.module('myApp')
    .directive('loginForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/login/loginForm.html',
            controller: 'LoginController'
        };
    });