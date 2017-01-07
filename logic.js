function main(){
	//Get City & Country code from IP (updated - works with adblock)
	$.getJSON("http://ipinfo.io/json", function(json) {	
	console.log(json);
	var userCity = json.city;
	$(".location").text(userCity + ", " + json.country);

	//split url and concatenate above json.city
	var url = "http://api.openweathermap.org/data/2.5/weather?";
	var city = "q=" + userCity;
	var queryStrings = "&units=metric&appid=b247d4b43cbaa161d2cb8e5047cf3a15"
		$.getJSON(url+city+queryStrings, function(json) {
  			$(".message").html(Math.round(json.main.temp) + "&deg;C" + "</br>" + json.weather[0].description);
  			console.log(json.weather[0]);

			//Cent to Fahrenheit buttons
			var centButton = document.querySelector("#cent");
			var fahrenButton = document.querySelector("#fahren");
			var converted = json.main.temp * 9 / 5 + 32;
			fahrenButton.addEventListener("click", function(){
				$(".message").html(Math.round(converted) + "&deg;F" + "</br>" + json.weather[0].description);
			});
			centButton.addEventListener("click", function(){
				$(".message").html(Math.round(json.main.temp) + "&deg;C" + "</br>" + json.weather[0].description);
			});

			//fetch icon
			var weatherIcon = json.weather[0].icon;
			var iconURL = "http://openweathermap.org/img/w/"
			var img = document.querySelector("img");
			img.setAttribute("src", iconURL + weatherIcon + ".png");

			//wind direction
			function windDirection(degree) {
  				var compassPoints = ['Northerly','North Easterly','Easterly','South Easterly','Southerly','South Westerly','Westerly','North Westerly'];
  
  				degree += 22.5;

  				if (degree < 0) 
    				degree = 360 - Math.abs(degree) % 360;
  				else 
    				degree = degree % 360;
  
  				var which = parseInt(degree / 45);
  				return compassPoints[which];
			};
			$(".wind").html("Wind: " + windDirection(json.wind.deg) + ", " + json.wind.speed + "m/s");

		},'jsonp');
	}, 'jsonp');
};

$(document).ready(main);

		// "http://api.openweathermap.org/data/2.5/weather?q=Hove&units=metric&appid=b247d4b43cbaa161d2cb8e5047cf3a15"
		// var test = '';
  		// test = JSON.stringify(json.main.temp);
  		// $(".message").html(test);
  		// alert(typeof test);
		// $('<li>').text(JSON.stringify(json.main)).appendTo('.posts');		
		// var mainObj = json.main;
		// $('<li>').text(mainObj.temp).appendTo('.posts');
		// $('<li>').text('').appendTo('.posts');
		// for(var x in mainObj){
			// $('<li>').text([x] + ": " + mainObj[x]).appendTo('.posts');
		// };