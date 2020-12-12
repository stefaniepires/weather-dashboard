var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&cnt=5&units=imperial&appid=6a22242f54371d060e263ed6f93748a9").then( function (response) {
    response.json().then(function(data) {
      //displayWeather(data, city);
      console.log(data);
      });
  });

}




//var for the form: <form> and <input> elements
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");

//to be executed upon a form submission browser event 
var formSubmitHandler = function(event) {
  event.preventDefault();
  //get value from input element
  var city = cityInputEl.value.trim();
  if(city) {
    getUserCity(city); //if there is a value, the value is passed to getUserCity function as argument 
    cityInputEl.value=""; //clears form
  } else {
    alert("Please enter a city and state");
  }
};

/* var displayWeather = function(weather, searchTerm) {
  if (weather.length === 0) {
    weatherContainerEl.textContent = "No weather found.";
    return;
  }

 // clear old content
weatherContainerEl.textContent = "";
weatherSearchTerm.textContent = searchTerm;
};

*/

//event listener to userFormEl
userFormEl.addEventListener("submit", formSubmitHandler);