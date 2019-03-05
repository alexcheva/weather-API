var processData = function(response) {
    console.log(response);
    // console.log('humidity', response.main.humidity);
    // console.log('temp', response.main.temp);
    // console.log('temp_min', response.main.temp_min);
    // console.log('temp_max', response.main.temp_max);
    
    var sunriseUTC = response.sys.sunrise;
    // sunriseUTC.toString(".sun").appendTo(".sun");
    var sunsetUTC = response.sys.sunset;
    var sunriseTime = new Date(sunriseUTC * 1000);
    var sunsetTime = new Date(sunsetUTC * 1000);
    
    
    // Get coordinates for UV
    var cords = {};
        cords.lat = response.coord.lat;
        cords.lon = response.coord.lon
    // Not working, bad gateway
    // getUV(cords);
    
    // console.log('sys.sunrise', sunriseTime);
    // console.log('sys.sunset', sunsetTime);
    
    // Removes old images from search
    $('.img-cont').each(function(){
        $(this).remove();
    });
    
    $.each(response.weather, function(i) {
        
        // console.info(i, response.weather[i]);
        
        // Set icon img src and text data
        setIcons(response.weather[i].icon, response.weather[i].main);
    });
    
    // Populate Heding
    $('.temp-city').text($("#city").val());
//     Populate main-temp
    $('.main-temp').empty().append("<i class='wi wi-thermometer'></i>  " + response.main.temp + "<sup> &deg;F</sup>");
    $('.temp-min-max').empty().append( "<strong>" + response.main.temp_min + "<sup> &deg;F</sup>"+ "/ " + response.main.temp_max + "<sup> &deg;F</sup> </strong>");
    // $("#output").empty();
    // $("#output").append(
    //     "The current temperature in " +
    //     $("#city").val() + " is: <strong>" +
    //     response.main.temp + "&deg;F</strong>"
    // );
};
var displayData = function() {

};

var setIcons = function(response, descText) {
    
    var icon = response;
    var imgSrc = 'http://openweathermap.org/img/w/' + icon + '.png';

    // console.info('imgSrc', imgSrc);
    var $img = $('<img>').addClass('icon').attr('src', imgSrc);
    var $imgCont = $('<div>').addClass('img-cont');
    var $txtCont = $('<p>').addClass('txt-cont');
    $txtCont.text(descText);
    // console.info($img);
    $imgCont.appendTo('.weather');
    $img.appendTo($imgCont);
    $txtCont.appendTo($imgCont);
    // $img.$("#output").append();
    $('#output').addClass('in');

};

var getWeather = function() {
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather", {
            appid: "60c882e0e921e7b4d6659cef2d6dbc2c",
            q: $("#city").val(),
            units: "imperial"
        },
        // Callback
        processData

    );
};
var getUV = function(cords) {
    console.info(cords.lon);
    console.info(cords.lat);
    
    $.getJSON(
        "http://api.owm.io/air/1.0/uvi/current", {
            lat: cords.lat,
            lon: cords.lon,
            appid: "60c882e0e921e7b4d6659cef2d6dbc2c"
        },
        // Callback
        processUV
    );
};
var processUV = function(response) {
    console.log(response);
};
$("#city").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});
$("#search").unbind("click").on('click', function(e) {
    e.preventDefault();
    getWeather();
        var now = new Date();
dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT").appendTo('#date');
 // Saturday, June 9th, 2007, 5:46:21 PM

});