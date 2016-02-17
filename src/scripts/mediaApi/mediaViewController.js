angular.module('myApp')
    .controller('MediaViewController', MediaViewController);

function MediaViewController($scope, MediaService, AjaxFactory) {

    $scope.trustSrc = MediaService.trustSrc;

    $scope.$watch(function () {
        return MediaService.file;
    }, function (newValue) {
        AjaxFactory.getFile(MediaService.file.fileId)
            .then(function (response) {
                //console.log(response);
                $scope.type = response.data.type;
                $scope.title = response.data.title;
                $scope.description = response.data.description;
                $scope.path = response.data.path;
                $scope.mimeType = response.data.mimeType;
            }, function (error) {
                MediaService.handleError(error);
            });

    });
}