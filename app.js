var app = angular.module("myapp", []);



app.controller("alles", function ($scope,$http) {
    $scope.roomsTaken = ["00.9", "00.10","00.15"];
    $scope.roomsAvailable = ["00.11", "00.12", "00.13", "00.14"];
    $scope.availableStuff = ["afstandsbediening"];
    $scope.takenStuff = ["HDMI-kabel"];

    $scope.roomToReserve;
    $scope.addRoom = function(room) {
        $scope.roomToReserve = room;
        console.log($scope.roomToReserve)
    }

    $scope.data;

    $http({
        method: 'GET',
        //test
    	//url:'http://localhost:3000/api/rooms'
    }).success(function(data)
    {
        $scope.data = data.data;
    	console.log("data geladen");
    	console.log(data.data);
    	console.log(data.data[0].gemeente);
    })
    .error(function(data)
    {
    	console.log(error);
    })
    //$scope.datetimepicker();

    $scope.hdmi = false;
    $scope.afstandsbediening = false;
    $scope.addHdmi = function () {
        if ($scope.hdmi) {
            $scope.hdmi = false;
        } else $scope.hdmi = true;
    }

    $scope.addAfstandsbediening = function () {
        if ($scope.afstandsbediening) {
            $scope.afstandsbediening = false;
        } else $scope.afstandsbediening = true;
    }

    //$scope.reserve = function () {
    //    json =
    //    {
    //        "nr": $scope.roomToReserve,
    //        "studentenNr": $scope.studentenNr,
    //        "tijd": "",
    //        "beschikbaar": false,
    //        "voorwerpen":
    //        {
    //            "hdmi":  
    //        }
    //    }
    //}
    
})
