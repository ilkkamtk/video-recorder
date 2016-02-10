angular.module('myApp')
    .controller('LoginController', function ($scope, $state, AjaxFactory, MediaService) {

        var doLogin = function (response) {
            MediaService.userData = response.data;
            $state.go('main');
        };


        $scope.login = function () {

            var data = {
                username: $scope.uname,
                password: $scope.pwd
            };

            var request = AjaxFactory.login(data);

            request.then(doLogin, MediaService.handleError);
        };

        $scope.register = function () {

            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                email: $scope.email
            };

            var request = AjaxFactory.register(data);

            request.then(doLogin, MediaService.handleError);
        };
    });