(function () {
	var app = angular.module('pomodoro', []);
	app.controller('pomodoroController', function($scope, $interval){
		$scope.sessionLength = 25;
		$scope.breakLength = 5;
		$scope.name = "Bob";
		$scope.timerRunning = false;
		$scope.timeLeft = $scope.sessionLength;

		$scope.toggleTimer = function() {
			//if it is running
			if (!timerRunning){

			}
		};
	});
})();