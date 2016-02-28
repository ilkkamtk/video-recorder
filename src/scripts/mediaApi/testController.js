angular.module('myApp')
    .controller('TestController', function ($scope, $httpParamSerializer, ajaxService) {
        $scope.image = angular.element('#destination')[0];
        console.log($scope.image);
        $scope.setImageFile = function (inputElem) {
            $scope.reader = new FileReader();
            $scope.reader.onload = function (e) {
                $scope.image.src = e.target.result;
            };
            $scope.reader.readAsDataURL(inputElem.files[0]);
        };

        $scope.profileImage = function () {
            var fd = new FormData($('#imageForm')[0]);

            ajaxService.uploadImage(fd)
                .success(function () {
                    $scope.getAllImages();
                })
                .error(function (error) {
                    alert('EWrrroorr!!');
                });
        };

        $scope.getAllImages = function () {
            ajaxService.getImages().success(function (data) {
                $scope.files = data;
            }).error(function (err) {
                console.log(err);
            });
        };
        $scope.getAllImages();

        $scope.signIn = function () {
            var signInData = {
                username: 'Ile',
                email: 'ilkka.kylmaniemi@metropolia.fi',
                password: 'q1w2e3r4'
            };
            ajaxService.register(signInData).success(function (data) {
                console.log(data);
            }).error(function (err) {
                console.log(err);
            });
        };
    });