var app = angular.module('TwitchStream', []);
app.controller('streamerCtrl', function($scope, $http){
	
	$scope.allUsers = [];
	$scope.onlineUsers = [];
	$scope.offlineUsers = [];
	$scope.profile = $scope.allUsers;

	var streamers = ["tsm_dyrus", "tsm_theoddone", "clgdoublelift"];

	streamers.forEach(function(stream) {
		var streamerInfo = {};
		$.getJSON("https://api.twitch.tv/kraken/streams/"+ stream + "/?callback=?").success(function(data) {
			var isOn = "online";
			if (data.stream === null){
				isOn = "offline";
			}
			var streamLink = "http://www.twitch.tv/" + stream;
			streamerInfo.online = isOn;
			streamerInfo.link = streamLink;


			$.getJSON("https://api.twitch.tv/kraken/users/"+ stream + "/?callback=?").success(function(data) {
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
				$scope.$apply();
			});

		});

	});

	$("#all").on('click', function() {
		$scope.profile = $scope.allUsers;
		$scope.$apply();
	});

	$("#online").on('click', function() {
		$scope.profile = $scope.onlineUsers;
		$scope.$apply();
	});

	$("#offline").on('click', function() {
		$scope.profile = $scope.offlineUsers;
		$scope.$apply();
	});

});