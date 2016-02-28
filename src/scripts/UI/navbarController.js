angular.module('myApp')
    .controller('NavbarController', NavbarController);

function NavbarController($scope, $state, MediaService) {
    $scope.$watch(function () {
        return MediaService.logged;
    }, function (newValue) {
        $scope.logged = MediaService.logged;
    });

    if (MediaService.userData.userId === undefined) {
        $state.go('login');
    }

    $scope.currState = $state;
    $scope.$watch('currState.current.name', function (newValue, oldValue) {
        $scope.state = newValue;
    });

}