var runningHistory = []

$("#search").on("click", function () {
$(".city-country ").empty();
$(".current-temp").empty();
$(".humidity ").empty();
$(".windspeed ").empty();
$(".uv-index ").empty();
$(".five-day ").empty();
// $(".history ").empty();

var APIKey = "cf033af614b15264df2b80a9a4d6be21";
var userCity = $("#searchbar").val();
console.log(userCity)
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log(response)
  let results = [response.name, response.wind.speed, response.wind.deg, response.main.humidity, response.main.temp,]

  $(".city-country").append("In " + (response.name) + ", " + (response.sys.country) + "... ");
  $(".current-temp").append("...the current temperature is " + Math.floor((response.main.temp - 273.15) * 1.80 + 32) + " &deg;F");
  $(".humidity").append("...the humidity level is " + (response.main.humidity) + " %");
  $(".windspeed").append("...the wind speed is " + response.wind.speed + " MPH");

  var lat = response.coord.lat;
  var lon = response.coord.lon;
  var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

  $.ajax({
    url: uvQuery,
    method: "GET"
  }).then(function(response) {
    var uvIndex = response.value;
      $(".uv-index").append("...the UV Index is " + uvIndex + ".");

  });

  var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?id=" + response.id + "&appid=" + APIKey;

  $.ajax({
    url: fiveDayUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response)

    for (let i = 0; i < 40; i+=9) {
      // var day = //moment

      //add the moment variable above to below jquery object
      let fiveDayForecast = $(`<div class="fiveDay">

                              <img src=http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png>
                              <p><b>Temp</b>:${Math.floor(((response.list[i].main.temp - 273.15) * 1.8) + 32)} degrees</p>
                              <p><b>Humidity</b>:${response.list[i].main.humidity}%</p>
                              </div>`)

      $(".five-day").append(fiveDayForecast);

    }
});

// fix so this is not always displaying
})
.catch(function(response) {
  console.log("failed")
  $("#dashboard").append(userCity + "is not a valid city.");
})

i=0
// adjust styling for this to be seen properly
runningHistory.push(userCity);
i++
window.localStorage.setItem("#history",JSON.stringify(runningHistory))

var localStorageCity = JSON.parse(window.localStorage.getItem("#history"))

// console.log(localStorageCity);
$(".history").append(localStorageCity[i]);


  
});

