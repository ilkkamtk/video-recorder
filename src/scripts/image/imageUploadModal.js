angular.module('myApp')
    .directive('imageUploadModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/image/imageUploadModal.html',
            controller: 'ImageUploadController'
        };
    });