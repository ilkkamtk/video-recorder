angular.module('myApp')
    .controller('LoginController', LoginController);

function LoginController($scope, $state, AjaxFactory, MediaService) {

    var doLogin = function (response) {
        if (response.data.error === undefined) {
            MediaService.userData = response.data;
            if (window.localStorage.getItem('userID') === null) {
                window.localStorage.setItem('userID', response.data.userId);
                window.localStorage.setItem('userName', $scope.uname);
                window.localStorage.setItem('userPwd', $scope.pwd);
            }
            MediaService.logged = true;
            $state.go('main', {
                slideDir: 'slide-right'
            });
        } else {
            MediaService.handleError(response.data);
        }
    };


    $scope.login = function () {
        var data = {};
        if (window.localStorage.getItem('userID') === null) {
            data = {
                username: $scope.uname,
                password: $scope.pwd
            };
        } else {
            data = {
                username: window.localStorage.getItem('userName'),
                password: window.localStorage.getItem('userPwd')
            };
        }

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



    if (window.localStorage.getItem('userID') !== null) {
        $scope.login();
    }
}