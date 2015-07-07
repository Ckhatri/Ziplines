$( document ).ready(function() {
	$("button").click(function() {
	$.ajax({
		url: 'http://quotesondesign.com/api/3.0/api-3.0.json',
		type: 'GET',
		dataType: "jsonp",
		success: function(response) {
			console.log(response);
			var authorName = response.author;
			var quote = response.quote;
			console.log(authorName);
			console.log(quote);
			$('.saying').text(quote);
			$('.author').text(authorName);
		},
		error: function(response) {
			alert('error! Issue with ajax call');
		}
	});
	});
});

