angular.module('myApp')
    .directive('soundRecordModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'scripts/sound/soundRecordModal.html',
            controller: 'SoundRecordController'
        };
    });