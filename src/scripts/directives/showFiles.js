angular.module('myApp')
    .directive('showFiles', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/showFiles.html'
        };
    });