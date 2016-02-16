angular.module('myApp')
    .directive('menu', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/UI/menu.html'
        };
    });