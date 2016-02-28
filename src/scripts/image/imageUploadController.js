angular.module('myApp')
    .controller('ImageUploadController', ImageUploadController);

function ImageUploadController($scope, $state, AjaxFactory, MediaService) {
    $scope.setMediaFile = function (element) {
        $scope.mimeType = element.files[0].type;
        $scope.type = $scope.mimeType.substr(0, 5);
    };

    $scope.sendFile = function () {
        var fd = new FormData(document.getElementById('fileForm'));
        fd.append('user', MediaService.userData.userId);
        fd.append('type', $scope.type);
        fd.append('mime-type', $scope.mimeType);

        var request = AjaxFactory.uploadFile(fd);

        request.then(function (response) {
            console.log(response.data);
            $state.go('login');
            angular.element('#imageModal').modal('hide');
        }, function (error) {
            console.log(error.data);
        });
    };
}