angular.module('myApp')
    .directive('showFiles', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/mediaApi/showFiles.html',
            controller: 'UserFilesController'
        };
    });