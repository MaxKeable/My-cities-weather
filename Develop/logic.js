var current = $("#current-day");
var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
// var cityTitle1 = $("#city-title1");
var date1 = $("#date1");
var temperature1 = $("#temperature1");
var windSpeed1 = $("#wind-speed1");
var count = 1;
var clearLocalStorage = $("#clear-local-storage");


current.text(currentdaydisplay);



var button = $("#search-button");
var APIKey = '25d9d63d4bd3a2a927968ea3df474bf8';
// var APIKey2 = '0c839ef37c88478204974a17403f2a01';


button.on("click", function() {
    var city = $("#search-input").val();
    if (city !== 'Enter Your Location' || city !== '' || city !== null) {
        var count = localStorage.getItem('count');
        count++;
        console.log(count);
        localStorage.setItem('count', count);
        fetch ('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+APIKey).then(Response => Response.json()).then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            localStorage.setItem('lat'+count, lat);
            localStorage.setItem('lon'+count, lon);
            localStorage.setItem('count', count);
            location.reload();
        });
    }
});


if (localStorage.getItem('lat'+ localStorage.getItem('count')) !== null && localStorage.getItem('lon' + localStorage.getItem('count')) !== null) {

    var date = dayjs().format("dddd, MMMM D, YYYY");
for (let i = 1; i <= localStorage.getItem('count'); i++) {
fetch ('https://api.openweathermap.org/data/2.5/weather?lat='+localStorage.getItem('lat' + i)+'&lon='+localStorage.getItem('lon' + i)+'&appid='+APIKey+'&units=metric').then(Response => Response.json()).then(data => {
    console.log(data);
    count = localStorage.getItem('count');

// create elments and create divs to display info

// Create a wrapper div for all the weather details
var weatherDetailsDiv = $("<div></div>").attr("class", "weather-details");

// Create the elements for the first div
var titleElement = $("<h3></h3>").text(data.name);
titleElement.attr("id", "city-title");
weatherDetailsDiv.append(titleElement);

var dateElement = $("<h4></h4>").text(date);
dateElement.attr("id", "date");
weatherDetailsDiv.append(dateElement);

var iconElement = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
iconElement.attr("id", "icon");
weatherDetailsDiv.append(iconElement);

// Create a wrapper div for the temperature details
var temperatureDetailsDiv = $("<div></div>").attr("class", "temperature-details");

var tempElement = $("<p></p>").text('Temperature: ' + data.main.temp + "℃");
tempElement.attr("id", "temperature");
weatherDetailsDiv.append(tempElement);
temperatureDetailsDiv.append(tempElement);

var feelslikeElement = $("<p></p>").text('Feels like: ' + data.main.feels_like + "℃");
feelslikeElement.attr("id", "feels-like");
weatherDetailsDiv.append(feelslikeElement);
temperatureDetailsDiv.append(feelslikeElement);

var tempminElement = $("<p></p>").text('Min: ' + data.main.temp_min + "℃");
tempminElement.attr("id", "temp-min");
weatherDetailsDiv.append(tempminElement);
temperatureDetailsDiv.append(tempminElement);

var tempmaxElement = $("<p></p>").text('Max: ' + data.main.temp_max + "℃");
tempmaxElement.attr("id", "temp-max");
weatherDetailsDiv.append(tempmaxElement);
temperatureDetailsDiv.append(tempmaxElement);

var humidityElement = $("<p></p>").text('Humidity: ' + data.main.humidity + "%");
humidityElement.attr("id", "humidity");
weatherDetailsDiv.append(humidityElement);
temperatureDetailsDiv.append(humidityElement);

var windspeedElement = $("<p></p>").text('Wind speed: ' + data.wind.speed + "km/h");
windspeedElement.attr("id", "wind-speed");
weatherDetailsDiv.append(windspeedElement);
temperatureDetailsDiv.append(windspeedElement);


weatherDetailsDiv.append(temperatureDetailsDiv);

// Create the second div and nest the weatherDetailsDiv inside it
var currentWeatherDiv = $("<div></div>").attr("class", "current-weather");
currentWeatherDiv.append(weatherDetailsDiv);

// Append the currentWeatherDiv to the cardDiv
$("#card-div").append(currentWeatherDiv);





});
    // forcasted weather conditions create elements and display info
    // fetch ('http://api.openweathermap.org/data/2.5/forecast?lat='+localStorage.getItem('lat' + i)+'&lon='+localStorage.getItem('lon' + i)+'&appid='+APIKey+'&index=1200').then(Response => Response.json()).then(data => 
    // {
    //     console.log(data);

    //     // day 1
    //     var day1DateElement = $("<h4></h4>").text(data.list[9].dt_txt);
    //     day1DateElement.attr("id", "day1-date");
    //     $("#day1-date").append(day1DateElement);
    //     $("#card-div").append(day1DateElement);

    //     var day1TempElement = $("<p></p>").text(data.list[9].main.temp + "℃");
    //     day1TempElement.attr("id", "day1-temp");
    //     $("#day1-temp").append(day1TempElement);
    //     $("#card-div").append(day1TempElement);

    //     var day1HumidityElement = $("<p></p>").text(data.list[9].main.humidity + "%");
    //     day1HumidityElement.attr("id", "day1-humidity");
    //     $("#day1-humidity").append(day1HumidityElement);
    //     $("#card-div").append(day1HumidityElement);

    //     var day1IconElement = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[9].weather[0].icon + ".png");
    //     day1IconElement.attr("id", "day1-icon");
    //     $("#day1-icon").append(day1IconElement);
    //     $("#card-div").append(day1IconElement);

    //     var day1WindElement = $("<p></p>").text(data.list[9].wind.speed + "km/h");
    //     day1WindElement.attr("id", "day1-wind");
    //     $("#day1-wind").append(day1WindElement);
    //     $("#card-div").append(day1WindElement);


    //     // day 2
    //     var day2DateElement = $("<h4></h4>").text(data.list[17].dt_txt);   
    //     day2DateElement.attr("id", "day2-date");
    //     $("#day2-date").append(day2DateElement);
    //     $("#card-div").append(day2DateElement);

    //     var day2TempElement = $("<p></p>").text(data.list[17].main.temp + "℃");
    //     day2TempElement.attr("id", "day2-temp");
    //     $("#day2-temp").append(day2TempElement);
    //     $("#card-div").append(day2TempElement);

    //     var day2HumidityElement = $("<p></p>").text(data.list[17].main.humidity + "%");
    //     day2HumidityElement.attr("id", "day2-humidity");
    //     $("#day2-humidity").append(day2HumidityElement);
    //     $("#card-div").append(day2HumidityElement);

    //     var day2IconElement = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[17].weather[0].icon + ".png");
    //     day2IconElement.attr("id", "day2-icon");
    //     $("#day2-icon").append(day2IconElement);
    //     $("#card-div").append(day2IconElement);

    //     var day2WindElement = $("<p></p>").text(data.list[17].wind.speed + "km/h");
    //     day2WindElement.attr("id", "day2-wind");
    //     $("#day2-wind").append(day2WindElement);
    //     $("#card-div").append(day2WindElement);

    //     // day 3
    //     var day3DateElement = $("<h4></h4>").text(data.list[25].dt_txt);
    //     day3DateElement.attr("id", "day3-date");
    //     $("#day3-date").append(day3DateElement);
    //     $("#card-div").append(day3DateElement);

    //     var day3TempElement = $("<p></p>").text(data.list[25].main.temp + "℃");
    //     day3TempElement.attr("id", "day3-temp");
    //     $("#day3-temp").append(day3TempElement);
    //     $("#card-div").append(day3TempElement);

    //     var day3HumidityElement = $("<p></p>").text(data.list[25].main.humidity + "%");
    //     day3HumidityElement.attr("id", "day3-humidity");
    //     $("#day3-humidity").append(day3HumidityElement);
    //     $("#card-div").append(day3HumidityElement);

    //     var day3IconElement = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[25].weather[0].icon + ".png");
    //     day3IconElement.attr("id", "day3-icon");
    //     $("#day3-icon").append(day3IconElement);
    //     $("#card-div").append(day3IconElement);

    //     var day3WindElement = $("<p></p>").text(data.list[25].wind.speed + "km/h");
    //     day3WindElement.attr("id", "day3-wind");
    //     $("#day3-wind").append(day3WindElement);
    //     $("#card-div").append(day3WindElement);

    //     // day 4

    //     var day4DateElement = $("<h4></h4>").text(data.list[33].dt_txt);
    //     day4DateElement.attr("id", "day4-date");
    //     $("#day4-date").append(day4DateElement);
    //     $("#card-div").append(day4DateElement);

    //     var day4TempElement = $("<p></p>").text(data.list[33].main.temp + "℃");
    //     day4TempElement.attr("id", "day4-temp");
    //     $("#day4-temp").append(day4TempElement);
    //     $("#card-div").append(day4TempElement);

    //     var day4HumidityElement = $("<p></p>").text(data.list[33].main.humidity + "%");
    //     day4HumidityElement.attr("id", "day4-humidity");
    //     $("#day4-humidity").append(day4HumidityElement);
    //     $("#card-div").append(day4HumidityElement);

    //     var day4IconElement = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[33].weather[0].icon + ".png");
    //     day4IconElement.attr("id", "day4-icon");
    //     $("#day4-icon").append(day4IconElement);
    //     $("#card-div").append(day4IconElement);

    //     var day4WindElement = $("<p></p>").text(data.list[33].wind.speed + "km/h");
    //     day4WindElement.attr("id", "day4-wind");
    //     $("#day4-wind").append(day4WindElement);
    //     $("#card-div").append(day4WindElement);

    //     // day 5
    //     var day5DateElement = $("<h4></h4>").text(data.list[41].dt_txt);
    //     day5DateElement.attr("id", "day5-date");
    //     $("#day5-date").append(day5DateElement);
    //     $("#card-div").append(day5DateElement);

    // });


};
}
    






clearLocalStorage.on("click", function() {
    localStorage.clear();
});




