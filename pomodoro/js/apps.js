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
		$scope.currColor = greenColor;
		var redColor = "red";
		var greenColor = "#99CC00";


		$scope.toggleTimer = function() {
			//if its running, turn off the timer when toggled. "Paused"
			//make sure to cancel current interval request, otherwise it'll speed up the time.
			$interval.cancel($scope.currentPromise);
			if ($scope.timerRunning){
				$scope.timerRunning = false;
				$scope.currColor = redColor;
			}

			//if it's not running, turn it on, then update the time.
			else {
				$scope.timerRunning = true;
				$scope.currentPromise = $interval(updateTimer, 1000);
				$scope.currColor = greenColor;
			}
		};

		$scope.reset = function() {
			//doesn't matter if you're paused or if it's running or if you're in a session or a break. reset is reset.
			$scope.timerRunning = false;
			$scope.timeLeft = $scope.sessionLength;
			$scope.onBreak = false;
			$interval.cancel($scope.currentPromise);
			$scope.name = "Session";
			$scope.currColor = greenColor;
		};


		function playAudio() {
			var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
			var audio = new Audio(wav);
			audio.play();
		}

		$scope.changeTime = function() {
			console.log("HELLO");
			if ($scope.onBreak) {
				$scope.breakLength = $scope.breakLength + 1;
			}
			else {
				$scope.sessionLength = $scope.sessionLength + 1;
			}
			$scope.timeLeft = $scope.timeLeft + 1;

		};

		function updateTimer() {
			//if its running, reduce the time by one second
			if ($scope.timerRunning){
				$scope.timeLeft--;
				//if the time gets below or equal to zero, turn it off, switch break break and sesssion as applicable
				if ($scope.timeLeft <= 0){
					playAudio();
					$scope.timerRunning = false;
					$scope.onBreak = !$scope.onBreak;
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

	});
})();