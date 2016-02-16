angular.module('myApp')
    .directive('navbar', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/UI/navbar.html',
            controller: 'NavbarController'
        };
    });