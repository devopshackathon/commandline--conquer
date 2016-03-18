var app = angular.module("myapp", []);



app.controller("alles", function ($scope,$http) {

    $scope.roomToReserve;
    $scope.addRoom = function(room) {
        $scope.roomToReserve = room;
        console.log($scope.roomToReserve);
    }

    $scope.data;
    $scope.availableStuff = ['afstandsbediening', 'HDMI-kabel'];
    $scope.takenStuff = [];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/rooms'
    }).success(function(data)
    {
        $scope.data = data;
    	amountHdmi = 0;
    	for (var i = 0; i < $scope.data.length ; i++) {
    	    if ($scope.data[i].voorwerpen.hdmi == 'True') {
    	        amountHdmi++;
    	        if (amountHdmi >= 2) {
    	            if ($scope.takenStuff.length < 1) {
    	                $scope.takenStuff.push('HDMI-kabel');
    	            }
    	            $scope.availableStuff.splice(1, 1);
    	        }
    	    }
    	}
    })
    .error(function(data)
    {
    	console.log(error);
    })
    var hdmi = "False";
    var afstandsbediening = "False";
    $scope.addStuff = function (item) {
        console.log(item)
        if (item == "HDMI-kabel" && hdmi == "False") {
            hdmi = "True";
        }
        else if (item == "HDMI-kabel" && hdmi == "True") {
            hdmi = "False";
        }
        else if (item == "afstandsbediening" && afstandsbediening == "False") {
            afstandsbediening = "True";
        }
        else if (item == "afstandsbediening" && afstandsbediening == "True") {
            afstandsbediening = "False";
        }
    }

    $scope.reserve = function () {
        console.log($scope.studentenNr);
        json =
        {
            "nr": $scope.roomToReserve,
            "studentenNr": $scope.studentenNr,
            "tijd": "",
            "beschikbaar": false,
            "voorwerpen":
            {
                "hdmi": hdmi,
                "afstandsbediening": afstandsbediening
            }
        }
        console.log(json);
        $http.post('/api/rooms', json);
    }

    
    
})
