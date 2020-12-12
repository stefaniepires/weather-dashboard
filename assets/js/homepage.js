//var for the form: <form> and <input> elements
var userFormEl = document.querySelector("#user-form");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var destinationInputEl = document.querySelector("#destination");
var weatherCardEl= document.getElementById("forecast-cards");
var searchHistoryListEl = document.getElementById("search-history-list");
var cityList = [];

//to be executed upon a form submission browser event 
var formSubmitHandler = function(event) {
  event.preventDefault();
  //get value from input element
  var city = destinationInputEl.value.trim();
  if(city) {
    getUserCity(city); //if there is a value, the value is passed to getUserCity function as argument 
    destinationInputEl.value=""; //clears form
  } else {
    alert("Please enter a city and state")
    return;
  };

  // save the user input in local storage 
    saveSearchTerm(city);

    loadSearchHistory();
};

var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayCurrentWeather(data)
       console.log(data);
      });
    } else {
      alert("Error!");
    }
})
.catch(function(error) {
  alert("unable to connect to Weather App");
});
};

var displayCurrentWeather =function (weatherData) {
var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

var div = document.createElement("div")

var innerHtml = 
'<div class="card">' +
'<div class="card-body">' +
'<h3>' +weatherData.name +'</h3>' + '<img src="' + iconUrl + '">' +
'<p><b>Temperature</b> '+weatherData.main.temp+' °F</p>' +
'<p><b>Humidity:</b> '+weatherData.main.humidity+'%</p>' +
'<p><b>Wind Speed:</b> '+weatherData.wind.speed+' MPH</p>' +
'</div>' + 
'</div>'

div.innerHTML = innerHtml
weatherCardEl.appendChild(div)

 };

 var saveSearchTerm = function (cityInput) {


    cityList.unshift(cityInput); 

    cityList = cityList.slice(0,10);
  

    localStorage.setItem("cityList",JSON.stringify(cityList))

};


var loadSearchHistory = function () {
cityList = JSON.parse(localStorage.getItem("cityList")) || [];
searchHistoryListEl.innerHTML = ""

for (var i= 0; i < cityList.length; i++){

  var li = document.createElement("li")

    li.classList.add("list-group-item")

    li.innerHTML = '<button type="button" class="list-group-item list-group-item-action"'+ cityList[i]+'">'+ cityList[i] + '</button>'

    searchHistoryListEl.appendChild(li);

  }
 
};



// when a button is clicked I used event delegation to call getCurrentWeatherData value of the button that was clicked using event.target.value
var searchHistoryHandler = function (event) {

  var button = (event.target);
  if (button.classList.contains("search-history-btn")) {

    getCurrentWeatherData(button.value);

  }  
};




// on page load I want search history to be displayed, so call it at bottom of page 

loadSearchHistory();


    

searchHistoryListEl.addEventListener("click", searchHistoryHandler);

    

 //event listeners
userFormEl.addEventListener("submit", formSubmitHandler);