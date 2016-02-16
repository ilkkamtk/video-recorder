angular.module('myApp')
    .controller('VideoRecordController', VideoRecordController);

function VideoRecordController($scope, $state, $cordovaCapture, $cordovaMedia, $cordovaDevice, MediaService, AjaxFactory) {
    $scope.status = 'Ready';
    var captureError = function (e) {
        console.log('captureError', e);
    };

    var captureSuccess = function (videoFile) {
        console.log('captureSuccess');
        console.log(videoFile);
        $scope.video = videoFile;
    };
    document.addEventListener('deviceready', function (evt) {
        console.log(evt);
        $scope.recordVideo = function () {
            var options = {
                limit: 1
            };
            console.log($cordovaCapture.captureVideo);
            $cordovaCapture.captureVideo(options).then(captureSuccess, captureError);
        };

    }, false);
    
    $scope.saveVideo = function () {
        $scope.status = 'uploading...';
        var data = {
            user: MediaService.userData.userId,
            title: $scope.title,
            description: $scope.description,
            type: 'video',
            mimeType: 'video/mp4',
            url: $scope.video[0].localURL
        };

        var win = function (r) {
            console.log('Code = ' + r.responseCode);
            console.log('Response = ' + r.response);
            console.log('Sent = ' + r.bytesSent);
            $scope.status = 'done';
            $state.go('login');
            angular.element('#videoModal').modal('hide');
        };

        var fail = function (error) {
            window.alert('An error has occurred: Code = ' + error.code);
            console.log('upload error source ' + error.source);
            console.log('upload error target ' + error.target);
            console.log('upload error status ' + error.http_status);
            console.log('upload error body ' + error.body);
            console.log('upload error exception ' + error.exception);
        };

        document.addEventListener('deviceready', function (evt) {
            AjaxFactory.saveMedia(data, win, fail);
        });
    };
}