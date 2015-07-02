$( document ).ready(function() {
	console.log("HEYO");
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?id=4684888&units=imperial',
		type: 'GET',
		dataType: "jsonp",
		success: function(response) {
			var info = response;
			var mainInfo = response.main;
			var temp = mainInfo.temp;
			var currWeather = response.weather;
			var weatherInfo = currWeather[0];
			var currentDescription = weatherInfo.description;
			var iconVal = weatherInfo.icon;
			var currentMain = weatherInfo.main;
			var windInfo = info.wind;
			var windSpeed = windInfo.speed;
			var windDir = windInfo.deg;
			$('#desc').text(currentDescription);
			$('#wind').text(windSpeed + " mph " + windDir + "°");
			$('.temp').text(temp + "°");
			var iconDiv = document.getElementById("weatherIcon");
			var weatherIcon = new Image();
			weatherIcon.onload = function () {
				iconDiv.appendChild(weatherIcon);
			};
			var source = "http://openweathermap.org/img/w/" + iconVal + ".png";
			// console.log(source);
			weatherIcon.src = source;
			console.log(weatherIcon.src);
			// console.log(weatherIcon);
			// console.log(info);
			// console.log(windInfo);
			// console.log(windSpeed);
			// console.log(windDir);
			// console.log(iconVal);

		},
		error: function(response) {
			alert(fuck);
		}
	});
});

