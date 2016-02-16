angular.module('myApp')
    .controller('SoundRecordController', SoundRecordController);

function SoundRecordController($scope, $state, $cordovaCapture, $cordovaMedia, $cordovaDevice, MediaService, AjaxFactory) {

    var captureError = function (e) {
        console.log('captureError', e);
    };

    var captureSuccess = function (soundFile) {
        console.log('captureSuccess');
        console.log(soundFile);
        $scope.sound = soundFile;
        $scope.paused = true;
    };
    document.addEventListener('deviceready', function (evt) {
        console.log(evt);
        $scope.record = function () {
            var options = {
                limit: 1,
                duration: 10
            };
            console.log($cordovaCapture.captureAudio);
            $cordovaCapture.captureAudio(options).then(captureSuccess, captureError);
        };

    }, false);

    document.addEventListener('deviceready', function (evt) {
        var platform = $cordovaDevice.getPlatform();
        $scope.playPause = function () {
            console.log($scope.sound[0].localURL);
            if (!$scope.sound) {
                console.log('Record a sound first.', null, 'Error');
                return;
            }
            var media = $cordovaMedia.newMedia($scope.sound[0].localURL);
            if (platform === 'iOS') {
                var iOSPlayOptions = {
                    numberOfLoops: 1,
                    playAudioWhenScreenIsLocked: false
                };
                media.play(iOSPlayOptions); // iOS only!
            } else {
                media.play();
            }

        };

    }, false);

    $scope.saveAudio = function () {
        $scope.status = 'uploading...';
        var data = {
            user: MediaService.userData.userId,
            title: $scope.title,
            description: $scope.description,
            type: 'audio',
            mimeType: 'audio/wav',
            url: $scope.sound[0].localURL
        };

        var win = function (r) {
            console.log('Code = ' + r.responseCode);
            console.log('Response = ' + r.response);
            console.log('Sent = ' + r.bytesSent);
            $scope.status = 'done';
            $state.go('login');
            angular.element('#soundModal').modal('hide');
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