angular.module('myApp')
    .controller('SingleViewController', SingleViewController);

function SingleViewController($scope, $state) {
    $scope.currState = $state;
    $scope.$watch('currState.current', function (newValue, oldValue) {
        $scope.state = newValue;
        console.log(newValue);
    });
}