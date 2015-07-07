var app = angular.module('TwitchStream', []);
app.controller('streamerCtrl', function($scope, $http){
	
	$scope.allUsers = [];
	$scope.onlineUsers = [];
	$scope.offlineUsers = [];
	$scope.profile = $scope.allUsers;

	var streamers = ["tsm_dyrus", "tsm_theoddone", "clgdoublelift"];

	streamers.forEach(function(stream) {
		var streamerInfo = {};
		$http.get("https://api.twitch.tv/kraken/streams/"+ stream).success(function(data) {
			var isOn = "online";
			if (data.stream === null){
				isOn = "offline";
			}
			var streamLink = "http://www.twitch.tv/" + stream;
			streamerInfo.online = isOn;
			streamerInfo.link = streamLink;


			$http.get("https://api.twitch.tv/kraken/users/"+ stream).success(function(data) {
				var name = data.display_name;
				var icon = data.logo;
				streamerInfo.displayName = name;
				streamerInfo.pic = icon;
				$scope.allUsers.push(streamerInfo);
				if (streamerInfo.online === "online"){
					$scope.onlineUsers.push(streamerInfo);
				}
				else {
					$scope.offlineUsers.push(streamerInfo);
				}
			});

		});

	});

	$("#all").on('click', function() {
		$scope.profile = $scope.allUsers;
		$scope.$apply();
	});

	$("#online").on('click', function() {
		$scope.profile = $scope.onlineUsers;
		console.log($scope.onlineUsers);
		$scope.$apply();
	});

	$("#offline").on('click', function() {
		$scope.profile = $scope.offlineUsers;
		console.log($scope.offlineUsers);
		$scope.$apply();
	});

});