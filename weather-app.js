"use strict";

$(document).ready(function() {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $(".container").html("Geolocation is not supported in this browser.");
  }
}

function showPosition(position) {
  var latitude, longitude;
  
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  
  getWeatherData(latitude, longitude);
}

function getWeatherData(latitude, longitude) {
  var location;
  var temp;
  var summary;
  var icon;

  $.getJSON("http://api.openweathermap.org/data/2.5/weather?appid=ca43cb2e5795fb9346f6c1c78b601089&lat=" + latitude + "&lon=" + longitude + "&units=imperial", function(data) {
    location = data.name;
    temp = Math.round(data.main.temp);
    summary = data.weather[0].main;
    icon = data.weather[0].icon;

    changeIcon(icon);

    $(".location").html(location);
    $(".temperature").html(temp + "&deg; F");
    $(".summary").html(summary);
  });
}

function changeIcon(icon) {
    switch (icon) {
        case "01d":
            $("body").css("background-image", "url('images/clear-sky-day.jpg')");
            break;
        case "01n":
            $("body").css("background-image", "url('images/clear-sky-night.jpg')");
            break;
        case "02d":
            $("body").css("background-image", "url('images/few-clouds-day.jpg')");
            break;
        case "02n":
            $("body").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "03d":
            $("body").css("background-image", "url('images/few-clouds-day.jpg')");
            break;
        case "03n":
            $("body").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "04d":
            $("body").css("background-image", "url('images/few-clouds-day.jpg')");
            break;
        case "04n":
            $("body").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "09d":
            $("body").css("background-image", "url('images/rainy-day.jpg')");
            break;
        case "09n":
            $("body").css("background-image", "url('images/rainy-night.jpg')");
            break;
        case "10d":
            $("body").css("background-image", "url('images/rainy-day.jpg')");
            break;
        case "10n":
            $("body").css("background-image", "url('images/rainy-night.jpg')");
            break;
        case "11d":
            $("body").css("background-image", "url('images/thunderstorm-day.jpg')");
            break;
        case "11n":
            $("body").css("background-image", "url('images/thunderstorm-night.jpg')");
            break;
        case "13d":
            $("body").css("background-image", "url('images/snowy-day.jpg')");
            $(".big-text").css("color", "#1F3E9A");
            $(".summary").css("color", "#1F3E9A");
            break;
        case "13n":
            $("body").css("background-image", "url('images/snowy-night.jpg')");
            break;
        case "50d":
            $("body").css("background-image", "url('images/misty-day.jpg')");
            $(".big-text").css("color", "#1F3E9A");
            $(".summary").css("color", "#1F3E9A");
            break;
        case "50n":
            $("body").css("background-image", "url('images/misty-night.jpg')");
            break;
    }
}