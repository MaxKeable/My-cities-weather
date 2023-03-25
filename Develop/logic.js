

var current = $("#current-day");
var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
var cityTitle1 = $("#city-title1");
var date1 = $("#date1");
var temperature1 = $("#temperature1");
var windSpeed1 = $("#wind-speed1");


current.text(currentdaydisplay);



var button = $("#search-button");
var APIKey = '25d9d63d4bd3a2a927968ea3df474bf8';


button.on("click", function() {
    var city = $("#search-input").val();
    if (city === 'Enter Your Location') {
        return
    } else if (city !== 'Enter Your Location') {
    localStorage.setItem('city1', city);
    cityTitle1.text(localStorage.getItem('city'));
    }

    fetch ('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+APIKey).then (Response => Response.json()).then (data => {
    console.log(data);
})
  });

