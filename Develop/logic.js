

var current = $("#current-day");
var currentdaydisplay = dayjs().format("dddd, MMMM D, YYYY");
var weather = [
    {
        city: 'Brisbane',
        temp: 20, 
        wind: 10, 
        humidity: 50, 
        uv: 6, 
    },
    {
        city: 'Sydney',
        temp: 15,
        wind: 5,
        humidity: 40,
        uv: 5,
    }
];
var temp = $('#temp');
var wind = $('#wind');
var humidity = $('#humidity');
var uv = $('#uv');
var card = $('#card');
var cityTitle = $('.card-title');


current.text(currentdaydisplay);



var button = $("#search-button");
var APIKey = '25d9d63d4bd3a2a927968ea3df474bf8';


button.on("click", function() {
    var city = $("#search-input").val();
    if (city === 'Location') {
        return
    } else if (city !== '') {
    $('#search-content').removeClass('search-content');
    $('#card-div').removeClass('hide');
    $('#card-div').addClass('card-display'); 
    localStorage.setItem('city', city);
    cityTitle.text(localStorage.getItem('city'));
    temp.text(weather[0].temp);
    }
  });

  

// fetch ('http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={APIKey}').then (Response => Response.json()).then (data => {
//     console.log(data);
// })

