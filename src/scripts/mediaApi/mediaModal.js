angular.module('myApp')
    .directive('mediaModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/mediaApi/mediaModal.html',
            controller: 'MediaModalController'
        };
    });