angular.module('myApp')
    .directive('videoRecordModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/video/videoRecordModal.html',
            controller: 'VideoRecordController'
        };
    });