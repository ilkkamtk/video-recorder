angular.module('myApp')
    .directive('fileForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/fileForm.html'
        };
    });