angular.module('myApp')
    .controller('MediaModalController', MediaModalController);

function MediaModalController($scope, MediaService) {

    $scope.trustSrc = MediaService.trustSrc;

    $scope.$watch(function () {
        return MediaService.file;
    }, function (newValue) {
        $scope.title = MediaService.file.title;
        $scope.path = MediaService.file.path;
        $scope.type = MediaService.file.type;
        $scope.mimeType = MediaService.file.mimeType;
    });

}