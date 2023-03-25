

var current = $("#current-day");
var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
var cityTitle1 = $("#city-title1");
var date1 = $("#date1");
var temperature1 = $("#temperature1");
var windSpeed1 = $("#wind-speed1");
var count = 0;
var clearLocalStorage = $("#clear-local-storage");


current.text(currentdaydisplay);



var button = $("#search-button");
var APIKey = '25d9d63d4bd3a2a927968ea3df474bf8';
// var APIKey2 = '0c839ef37c88478204974a17403f2a01';


button.on("click", function() {
    var city = $("#search-input").val();
    if (city === 'Enter Your Location' || city === '' || city === null) {
        return;
    } else if (city !== 'Enter Your Location') {
        fetch ('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+APIKey).then(Response => Response.json()).then(data => {
            var count = localStorage.getItem('count');
            count++;
            console.log(count);
            var lat = data[0].lat;
            var lon = data[0].lon;
            localStorage.setItem('lat'+count, lat);
            localStorage.setItem('lon'+count, lon);
            localStorage.setItem('count', count);

            fetch ('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+APIKey+'&units=metric').then(Response => Response.json()).then(data => {
                localStorage.setItem('city'+count, data.name);
                console.log(data);
            });
        });
    }
});


if (localStorage.getItem('lat1') === null && localStorage.getItem('lon1') === null) {
    // do nothing
} else if (localStorage.getItem('lat1') !== null && localStorage.getItem('lon1') !== null) {
fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+localStorage.getItem('lat1')+'&lon='+localStorage.getItem('lon1')+'&appid='+APIKey+'&units=metric').then(Response => Response.json()).then(data => {
    console.log(data);
    console.log('holy fuck it works');
});
}
    






clearLocalStorage.on("click", function() {
    localStorage.clear();
});




