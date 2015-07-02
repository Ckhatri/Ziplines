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
			var currentMain = weatherInfo.main;
			var windInfo = info.wind;
			var windSpeed = windInfo.speed;
			var windDir = windInfo.deg;
			$('#desc').text(currentDescription);
			$('#wind').text(windSpeed + " mph " + windDir + "°");
			console.log(info);
			console.log(windInfo);
			console.log(windSpeed);
			console.log(windDir);

		},
		error: function(response) {
			alert(fuck);
		}
	});
});

