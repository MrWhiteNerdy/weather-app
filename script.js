$(window).load(function () {
  $(".loader").fadeOut("slow");
});

$(document).ready(function () {
  initialize();
  getLocation();
  setInterval(getLocation, 300000);
});

let geocoder;
let city;

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function getCity(lat, lng) {
  let latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $.each(results, function (i, address_component) {
          if (address_component.types[0] === "locality") {
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
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getCity(latitude, longitude);
  getWeatherData(latitude, longitude);
}

function getWeatherData(latitude, longitude) {
  $.ajax({
    url: "https://api.darksky.net/forecast/9bb326b6d66740ee5c8b8f8dd4091d69/" + latitude + "," + longitude,
    dataType: "jsonp",
    jsonp: "callback",
    success: function (data) {
      $(".location").html(city);
      $(".temperature").html(Math.round(data.currently.temperature) + "&deg; F");
      $(".summary").html(data.currently.summary);
      setIcon(data.currently.icon);
    }
  });
}

function setIcon(icon) {
  let skycons = new Skycons({"color": "#3937AA;"});
  skycons.add("icon", icon);
  skycons.play();
}
