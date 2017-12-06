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
      const forecast = document.getElementById('forecast');

      forecast.innerHTML = '';
      $(".location").html(city);
      $(".temperature").html(Math.round(data.currently.temperature) + "&deg; F");
      $(".summary").html(data.currently.summary);
      setIcon("main-icon", data.currently.icon);

      for (let i = 1; i < 4; i++) {
        let html = `
          <div class="col s8 offset-s2 m4">
            <div class="card">
              <div class="card-content center-align">
                <span class="card-title">${getDate(data.daily.data[i].time)}</span>
                <p>${Math.round(data.daily.data[i].temperatureLow)} / ${Math.round(data.daily.data[i].temperatureHigh)}&deg; F</p>
                <canvas id="icon-${i}" class="icon" width="64" height="64"></canvas>
              </div>
            </div>
          </div>
        `;
        forecast.innerHTML += html;

        for (let i = 1; i < 4; i++) {
          setIcon(`icon-${i}`, data.daily.data[i].icon);
        }
      }
    }
  });
}

function setIcon(id, icon) {
  let skycons = new Skycons({"color": "#3937AA;"});
  if (icon === 'partly-cloudy-night') {
    skycons.add(id, 'clear-day');
  } else {
    skycons.add(id, icon);
  }
  skycons.play();
}

function getDate(unixTime) {
  const date = new Date(unixTime * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}
