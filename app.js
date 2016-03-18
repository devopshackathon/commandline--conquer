var app = angular.module("myapp", []);



app.controller("alles", function ($scope,$http) {

    $scope.roomToReserve;
    $scope.addRoom = function(room) {
        $scope.roomToReserve = room;
        console.log($scope.roomToReserve);
    }

    $scope.data;
    $scope.availableStuff = ['afstandbediening', 'HDMI-kabel'];
    $scope.takenStuff = [];

    $http({
        method: 'GET',
        //url: "http://datasets.antwerpen.be/v4/gis/wifiopenbaar.json"
        //url: 'http://mlab.com/databases/hackathonea/collections/lokalendb',
        url: 'http://localhost:3000/api/rooms',
        username: 'mathias',
        password: 'hackathon'
    }).success(function(data)
    {
        $scope.data = data;
    	console.log("data geladen");
    	console.log(data);
    	console.log(data[0].voorwerpen.hdmi);
    	amountHdmi = 0;
    	for (var i = 0; i < $scope.data[i].length ; i++) {
    	    if ($scope.data.voorwerpen.hdmi == 'True') {
    	        amountHdmi++;
    	        if (amountHdmi >= 2) {
    	            $scope.takenStuff.push('HDMI-kabel');
    	            $scope.availableStuff.remove('HDMI-kabel');
    	        }
    	    }
    	}
    })
    .error(function(data)
    {
    	console.log(error);
    })

    
    

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
   

    $scope.reserve = function () {
        json =
        {
            "nr": $scope.roomToReserve,
            "studentenNr": $scope.studentenNr,
            "tijd": "",
            "beschikbaar": false,
            "voorwerpen":
            {
                "hdmi": $scope.hdmi,
                "afstandsbediening": $scope.afstandsbediening
            }
        }
    }
    
})
