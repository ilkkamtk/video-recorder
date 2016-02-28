angular.module('myApp')
    .controller('UserFilesController', UserFilesController);

function UserFilesController($scope, $state, AjaxFactory, MediaService) {

    $scope.trustSrc = MediaService.trustSrc;

    var user = MediaService.userData;

    AjaxFactory.fileByUser(user.userId)
        .then(function (response) {
            //console.log(response);
            MediaService.files = response.data;
            $scope.files = MediaService.files;
        }, function (error) {
            MediaService.handleError(error);
        });

    $scope.setFileAttrs = function ($index) {
        MediaService.setVariable('file', $index);
    };
}