var APIKey = "cf033af614b15264df2b80a9a4d6be21";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(queryURL);

  let results = [response.name, response.wind.speed, response.wind.deg, response.main.humidity, response.main.temp,]
  console.log(results);

  $(".current-temp").append("The current temperature is " + Math.floor((response.name - 273.15) * 1.80 + 32) + " &deg;F");
  $(".humidity").append(response.main.humidity);
  $(".windspeed").append(response.wind.speed + " MPH, ");
  $(".uv-index").append(response.uvindex);
});
