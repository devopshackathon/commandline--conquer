var app = angular.module("myapp", []);



app.controller("alles", function ($scope) {
    $scope.roomsTaken = ["00.9", "00.10","00.15"];
    $scope.roomsAvailable = ["00.11", "00.12", "00.13", "00.14"];
    $scope.availableStuff = ["afstandsbediening"];
    $scope.takenStuff = ["HDMI-kabel"];

    $scope.roomsToReserve = [];
    $scope.reserveRoom = function(room) {
        $scope.roomsToReserve.push(room);
        console.log($scope.roomsToReserve);
    }
    //$scope.datetimepicker();
})