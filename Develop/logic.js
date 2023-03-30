var current = $("#current-day");
var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
// var cityTitle1 = $("#city-title1");
var date1 = $("#date1");
var temperature1 = $("#temperature1");
var windSpeed1 = $("#wind-speed1");
var count = 1;
var clearLocalStorage = $("#clear-local-storage");
var forcastState;


current.text(currentdaydisplay);



var button = $("#search-button");
var APIKey = '25d9d63d4bd3a2a927968ea3df474bf8';
// var APIKey2 = '0c839ef37c88478204974a17403f2a01';


button.on("click", function () {
    var city = $("#search-input").val();
    if (city !== 'Enter Your Location' || city !== '' || city !== null) {
        var count = localStorage.getItem('count');
        count++;
        console.log(count);
        localStorage.setItem('count', count);
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + APIKey).then(Response => Response.json()).then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            localStorage.setItem('lat' + count, lat);
            localStorage.setItem('lon' + count, lon);
            localStorage.setItem('count', count);
            location.reload();
        });
    }
});


if (localStorage.getItem('lat' + localStorage.getItem('count')) !== null && localStorage.getItem('lon' + localStorage.getItem('count')) !== null) {
    var date = dayjs().format("dddd, MMMM D, YYYY");
    for (let i = 1; i <= localStorage.getItem('count'); i++) {

        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + localStorage.getItem('lat' + i) + '&lon=' + localStorage.getItem('lon' + i) + '&appid=' + APIKey + '&units=metric').then(Response => Response.json()).then(data => {
            console.log(data);
            count = localStorage.getItem('count');
            $('#number-locations').text(count);
            // create elments and create divs to display info

            // Create a wrapper div for all the weather details
            var weatherDetailsDiv = $("<div></div>").attr("class", "weather-details");

            // Create the elements for the first div
            var titleElement = $("<h3></h3>").text(data.name);
            localStorage.setItem('city' + i, data.name);
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

            var forcastbtnElement = $("<button></button>").text('5 Day Forcast');
            forcastbtnElement.attr("id", "forcast-btn");
            weatherDetailsDiv.append(forcastbtnElement);




            weatherDetailsDiv.append(temperatureDetailsDiv);

            // Create the second div and nest the weatherDetailsDiv inside it
            var currentWeatherDiv = $("<div></div>").attr("class", "current-weather");
            currentWeatherDiv.append(weatherDetailsDiv);


            // Append the currentWeatherDiv to the cardDiv
            $("#card-div").append(currentWeatherDiv); 



            // forcast button
            $("#forcast-btn").on("click", function () {
                $(".cards").addClass("hide");
                $("#card-div").addClass("hide");
            
                for (let i = 1; i <= localStorage.getItem('count'); i++) {
                fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + localStorage.getItem('lat' + i) + '&lon=' + localStorage.getItem('lon' + i) + '&appid=' + APIKey + '&index=1200&units=metric').then(Response => Response.json()).then(data => {
                    console.log(data);

                    var forcastItems = $("<div></div>").attr("class", "weather-details");
                    
                    // Create a wrapper div for the temperature details
                    var forcastInfo = $("<div></div>").attr("class", "temperature-details");
        

                    // Create the elements for the first div
                    // day 1
                    var forcastTitle = $("<h2></h2>").text(localStorage.getItem('city' + i));
                    var day1date = $("<h3></h3>").text(data.list[6].dt_txt);
                    day1date.attr("id", "day1date");
                    forcastItems.append(day1date);
                    forcastInfo.append(day1date);
        
                    var day1Temp = $("<p></p>").text('Temperature: ' + data.list[6].main.temp + "℃");
                    day1Temp.attr("id", "day1Temp");
                    forcastItems.append(day1Temp);
                    forcastInfo.append(day1Temp);

                    var day1Humidity = $("<p></p>").text('Humidity: ' + data.list[6].main.humidity + "%");
                    day1Humidity.attr("id", "day1Humidity");
                    forcastItems.append(day1Humidity);
                    forcastInfo.append(day1Humidity);

                    var day1Icon = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[6].weather[0].icon + ".png");
                    day1Icon.attr("id", "day1Icon");
                    forcastItems.append(day1Icon);
                    forcastInfo.append(day1Icon);

                    var day1WindElement = $("<p></p>").text('Wind speed: ' + data.list[6].wind.speed + "km/h");
                    day1WindElement.attr("id", "day1Wind");
                    forcastItems.append(day1WindElement);
                    forcastInfo.append(day1WindElement);

                    // day 2
                    var day2date = $("<h3></h3>").text(data.list[14].dt_txt);
                    day2date.attr("id", "day2date");
                    forcastItems.append(day2date);
                    forcastInfo.append(day2date);
                    
                    var day2Temp = $("<p></p>").text('Temperature: ' + data.list[14].main.temp + "℃");
                    day2Temp.attr("id", "day2Temp");
                    forcastItems.append(day2Temp);
                    forcastInfo.append(day2Temp);

                    var day2Humidity = $("<p></p>").text('Humidity: ' + data.list[14].main.humidity + "%");
                    day2Humidity.attr("id", "day2Humidity");
                    forcastItems.append(day2Humidity);
                    forcastInfo.append(day2Humidity);

                    var day2Icon = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png");
                    day2Icon.attr("id", "day2Icon");
                    forcastItems.append(day2Icon);
                    forcastInfo.append(day2Icon);
                    
                    var day2WindElement = $("<p></p>").text('Wind speed: ' + data.list[14].wind.speed + "km/h");
                    day2WindElement.attr("id", "day2Wind");
                    forcastItems.append(day2WindElement);
                    forcastInfo.append(day2WindElement);

                    // day 3
                    var day3date = $("<h3></h3>").text(data.list[22].dt_txt);
                    day3date.attr("id", "day3date");
                    forcastItems.append(day3date);
                    forcastInfo.append(day3date);

                    var day3Temp = $("<p></p>").text('Temperature: ' + data.list[22].main.temp + "℃");
                    day3Temp.attr("id", "day3Temp");
                    forcastItems.append(day3Temp);
                    forcastInfo.append(day3Temp);

                    var day3Humidity = $("<p></p>").text('Humidity: ' + data.list[22].main.humidity + "%");
                    day3Humidity.attr("id", "day3Humidity");
                    forcastItems.append(day3Humidity);
                    forcastInfo.append(day3Humidity);

                    var day3Icon = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[22].weather[0].icon + ".png");
                    day3Icon.attr("id", "day3Icon");
                    forcastItems.append(day3Icon);
                    forcastInfo.append(day3Icon);

                    var day3WindElement = $("<p></p>").text('Wind speed: ' + data.list[22].wind.speed + "km/h");
                    day3WindElement.attr("id", "day3Wind");
                    forcastItems.append(day3WindElement);
                    forcastInfo.append(day3WindElement);

                    // day 4
                    var day4date = $("<h3></h3>").text(data.list[30].dt_txt);
                    day4date.attr("id", "day4date");
                    forcastItems.append(day4date);
                    forcastInfo.append(day4date);

                    var day4Temp = $("<p></p>").text('Temperature: ' + data.list[30].main.temp + "℃");
                    day4Temp.attr("id", "day4Temp");
                    forcastItems.append(day4Temp);
                    forcastInfo.append(day4Temp);

                    var day4Humidity = $("<p></p>").text('Humidity: ' + data.list[30].main.humidity + "%");
                    day4Humidity.attr("id", "day4Humidity");
                    forcastItems.append(day4Humidity);
                    forcastInfo.append(day4Humidity);

                    var day4Icon = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[30].weather[0].icon + ".png");
                    day4Icon.attr("id", "day4Icon");
                    forcastItems.append(day4Icon);
                    forcastInfo.append(day4Icon);

                    var day4WindElement = $("<p></p>").text('Wind speed: ' + data.list[30].wind.speed + "km/h");
                    day4WindElement.attr("id", "day4Wind");
                    forcastItems.append(day4WindElement);
                    forcastInfo.append(day4WindElement);

                    // day 5
                    var day5date = $("<h3></h3>").text(data.list[38].dt_txt);
                    day5date.attr("id", "day5date");
                    forcastItems.append(day5date);
                    forcastInfo.append(day5date);

                    var day5Temp = $("<p></p>").text('Temperature: ' + data.list[38].main.temp + "℃");
                    day5Temp.attr("id", "day5Temp");
                    forcastItems.append(day5Temp);
                    forcastInfo.append(day5Temp);

                    var day5Humidity = $("<p></p>").text('Humidity: ' + data.list[38].main.humidity + "%");
                    day5Humidity.attr("id", "day5Humidity");
                    forcastItems.append(day5Humidity);
                    forcastInfo.append(day5Humidity);

                    var day5Icon = $("<img></img>").attr("src", "http://openweathermap.org/img/w/" + data.list[38].weather[0].icon + ".png");
                    day5Icon.attr("id", "day5Icon");
                    forcastItems.append(day5Icon);
                    forcastInfo.append(day5Icon);

                    var day5WindElement = $("<p></p>").text('Wind speed: ' + data.list[38].wind.speed + "km/h");
                    day5WindElement.attr("id", "day5Wind");
                    forcastItems.append(day5WindElement);
                    forcastInfo.append(day5WindElement);



        
        
                    forcastItems.append(forcastInfo);
        
                    // Create the second div and nest the weatherDetailsDiv inside it
                    var currentforcast = $("<div></div>").attr("class", "current-weather");
                    currentforcast.append(forcastItems);
        
        
                    // Append the currentWeatherDiv to the cardDiv
                    $("#forcast-div").append(currentforcast); 

                
                 });
                }
            }); 
        })
    }
}

// $("#forcast-btn").on("click", function () {
//     forcastState = true;
//     $(".weather-details").addClass("hide");
//     console.log(forcastState);
//   });
  
  








clearLocalStorage.on("click", function () {
            localStorage.clear();
            document.location.reload();
        });