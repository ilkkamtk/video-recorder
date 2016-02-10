angular.module('myApp')
    .controller('RecordController', function ($scope, $cordovaCapture, $cordovaMedia, $cordovaDevice) {

        var captureError = function (e) {
            console.log('captureError', e);
        };

        var captureSuccess = function (soundFile) {
            console.log('captureSuccess');
            console.log(soundFile);
            $scope.sound = soundFile;
        };
        document.addEventListener("deviceready", function (evt) {
            console.log(evt);
            $scope.record = function () {
                var options = {
                    limit: 3,
                    duration: 10
                };
                console.log($cordovaCapture.captureAudio);
                $cordovaCapture.captureAudio(options).then(captureSuccess, captureError);
            };

        }, false);

        document.addEventListener("deviceready", function (evt) {
            var platform = $cordovaDevice.getPlatform();
            
                console.log(platform);
            console.log(Media);

            $scope.play = function () {
                console.log($scope.sound[0].localURL);
                if (!$scope.sound) {
                    console.log("Record a sound first.", null, "Error");
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
    });