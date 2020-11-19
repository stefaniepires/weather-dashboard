var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=dfda35368bbd4b6f36f9ed7f2ede83c5").then( function (response) {
    response.json().then(function(data) {
      console.log(data);
      });
  });

}


getUserCity("Dallas, TX");



