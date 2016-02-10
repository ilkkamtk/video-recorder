angular.module('myApp')
    .directive('recordForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/recordForm.html'
        };
    });