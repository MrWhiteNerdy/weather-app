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
        case "clear-day":
            $("html").css("background-image", "url('images/clear-sky-day.jpg')");
            break;
        case "clear-night":
            $("html").css("background-image", "url('images/clear-sky-night.jpg')");
            break;
        case "partly-cloudy-day":
            $("html").css("background-image", "url('images/few-clouds-day.jpg')");
            $(".big-text").css("color", "#191432");
            $(".small-text").css("color", "#191432");
            break;
        case "partly-cloudy-night":
            $("html").css("background-image", "url('images/few-clouds-night.jpg')");
            break;
        case "sleet":
            $("html").css("background-image", "url('images/sleet.jpg')");
            break;
        case "wind":
            $("html").css("background-image", "url('images/wind.jpg')");
            break;
        case "fog":
            $("html").css("background-image", "url('images/fog.jpg')");
            break;
        case "cloudy":
            $("html").css("background-image", "url('images/cloudy.jpg')");
            break;
        case "rain":
            $("html").css("background-image", "url('images/rainy-day.jpg')");
            break;
        case "snow":
            $("html").css("background-image", "url('images/snowy-day.jpg')");
            $(".big-text").css("color", "#1F3E9A");
            $(".small-text").css("color", "#1F3E9A");
            break;
        default:
            
    }
}
