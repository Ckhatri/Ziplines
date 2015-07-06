(function () {
	var app = angular.module('pomodoro', []);
	app.controller('pomodoroController', function($scope, $interval){
		$scope.sessionLength = 25;
		$scope.breakLength = 5;
		$scope.name = "Session";
		$scope.timerRunning = false;
		$scope.timeLeft = $scope.sessionLength;
		$scope.onBreak = false;
		$scope.currentPromise = true;


		$scope.toggleTimer = function() {
			//if its running, turn off the timer when toggled. "Paused"
			//make sure to cancel current interval request, otherwise it'll speed up the time.
			$interval.cancel($scope.currentPromise);
			if ($scope.timerRunning){
				$scope.timerRunning = false;
			}

			//if it's not running, turn it on, then update the time.
			else {
				$scope.timerRunning = true;
				$scope.currentPromise = $interval(updateTimer, 1000);
			}
		};

		$scope.reset = function() {
			//doesn't matter if you're paused or if it's running or if you're in a session or a break. reset is reset.
			$scope.timerRunning = false;
			$scope.timeLeft = $scope.sessionLength;
			$scope.onBreak = false;
			$interval.cancel($scope.currentPromise);
			$scope.name = "Session";
		};


		function updateTimer() {
			//if its running, reduce the time by one second
			if ($scope.timerRunning){
				$scope.timeLeft--;
				//if the time gets below or equal to zero, turn it off, switch break break and sesssion as applicable
				if ($scope.timeLeft <= 0){
					$scope.timerRunning = false;
					$scope.onBreak = !$scope.onBreak;
					console.log("ON BREAK?" + $scope.onBreak);
					if ($scope.onBreak){
						$scope.timeLeft = $scope.breakLength;
						$scope.name = "Break";
					}
					else {
						$scope.timeLeft = $scope.sessionLength;
						$scope.name = "Session";	
					}
				}
			}
		}
		// $scope.toggleTimer = function() {
		// 	//if it is running
		// 	if (!$scope.timerRunning){
		// 		$scope.timerRunning = true;
		// 		updateTimer();
		// 		$interval(updateTimer, 100);
		// 	}
		// 	else {
		// 		$scope.timerRunning = false;
		// 	}
		// };

		// function updateTimer() {
		// 	if ($scope.timeLeft <= 0){
		// 		$scope.timerRunning = false;
		// 		$scope.
		// 	}
		// 	else if ($scope.timerRunning) {
		// 		$scope.timeLeft--;
		// 	}
		// }

		// function stopTimer() {
		// 	$scope.timerRunning = false;
		// }

	});
})();