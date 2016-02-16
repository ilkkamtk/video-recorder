angular.module('myApp')
    .controller('UserFilesController', UserFilesController);

function UserFilesController($scope, $sce, AjaxFactory, MediaService) {

    $scope.trustSrc = MediaService.trustSrc;

    var user = MediaService.userData;

    AjaxFactory.fileByUser(user.userId)
        .then(function (response) {
            //console.log(response);
            $scope.files = response.data;
        }, function (error) {
            MediaService.handleError(error);
        });

    $scope.setFileAttrs = function (file) {
        MediaService.setVariable('file', file);
    };
}