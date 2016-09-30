$(document).ready(function() {
    initialize();
    getLocation();
    changeIcon();
    setInterval(getLocation, 300000);
});

var geocoder;
var city;

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function getCity(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
              var arrAddress = results;
              $.each(arrAddress, function(i, address_component) {
                  if (address_component.types[0] == "locality") {
                      city = address_component.address_components[0].long_name;
                    }
                });
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $(".content").html("Gelocation is not enabled in this browser");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getCity(latitude, longitude);
    getWeatherData(latitude, longitude);
}

function getWeatherData(latitude, longitude) {
    var temp;
    var summary;
    var icon;

    $.ajax({
        url: "https://api.darksky.net/forecast/9bb326b6d66740ee5c8b8f8dd4091d69/" + latitude + "," + longitude,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
            temp = Math.round(data.currently.temperature);
            summary = data.currently.summary;
            icon = data.currently.icon;

            changeIcon(icon);

            $(".location").html(city);
            $(".temperature").html(temp + "&deg; F");
            $(".summary").html(summary);
        }
    })
}

function changeIcon(icon) {
    switch (icon) {
        case "01d":
            $("html").css("background-image", "url('images/clear-sky-day.jpg')");
            break;
        case "01n":
            $("html").css("background-image", "url('images/clear-sky-night.jpg')");
            break;
        case "02d":
            $("html").css("background-image", "url('images/few-clouds-day.jpg')");
            $(".big-text").css("color", "#191432");
            $(".small-text").css("color", "#191432");
            break;
        case "02n":
            $("html").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "03d":
            $("html").css("background-image", "url('images/few-clouds-day.jpg')");
            $(".big-text").css("color", "#191432");
            $(".small-text").css("color", "#191432");
            break;
        case "03n":
            $("html").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "04d":
            $("html").css("background-image", "url('images/few-clouds-day.jpg')");
            $(".big-text").css("color", "#191432");
            $(".small-text").css("color", "#191432");
            break;
        case "04n":
            $("html").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "09d":
            $("html").css("background-image", "url('images/rainy-day.jpg')");
            break;
        case "09n":
            $("html").css("background-image", "url('images/rainy-night.jpg')");
            break;
        case "10d":
            $("html").css("background-image", "url('images/rainy-day.jpg')");
            break;
        case "10n":
            $("html").css("background-image", "url('images/rainy-night.jpg')");
            break;
        case "11d":
            $("html").css("background-image", "url('images/thunderstorm-day.jpg')");
            break;
        case "11n":
            $("html").css("background-image", "url('images/thunderstorm-night.jpg')");
            break;
        case "13d":
            $("html").css("background-image", "url('images/snowy-day.jpg')");
            $(".big-text").css("color", "#1F3E9A");
            $(".small-text").css("color", "#1F3E9A");
            break;
        case "13n":
            $("html").css("background-image", "url('images/snowy-night.jpg')");
            break;
        case "50d":
            $("html").css("background-image", "url('images/misty-day.jpg')");
            $(".big-text").css("color", "#1F3E9A");
            $(".small-text").css("color", "#1F3E9A");
            break;
        case "50n":
            $("html").css("background-image", "url('images/misty-night.jpg')");
            break;
    }
}
