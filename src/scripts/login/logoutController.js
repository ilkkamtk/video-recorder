angular.module('myApp')
    .controller('LogoutController', LogoutController);

function LogoutController($scope, $state, MediaService) {
    window.localStorage.removeItem('userID');
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('userPwd');
    MediaService.logged = false;
    $state.go('login');
}