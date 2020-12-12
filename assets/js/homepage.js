//var for the form: <form> and <input> elements
var userFormEl = document.querySelector("#userInput");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var destinationInputEl = document.querySelector("#destination");
var weatherCardEl= document.getElementById("weather-card");
var searchHistoryListEl = document.getElementById("search-history-list");
var forecastCardsEl= document.getElementById("forecast-cards");
var cityList = [];
var currentTime = moment().format("MMM D, YYYY");

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
        displayCurrentWeather(data);
      });
    } else {
      alert("Error!");
    }
})
.catch(function(error) {
  alert("unable to connect to Weather App");
});
getUserInput(city,state);
};

var displayCurrentWeather =function (weatherData) {
//clear out any old content
weatherCardEl.textContent = "";

var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

var div = document.createElement("div")
var innerHtml = 
'<h3 class="text-dark text-center">Daily Weather: </h3> <hr>' + 
'<h5>' + weatherData.name + ' ' + '(' + currentTime+ ')' +'<img src="'+ iconUrl + '">' + '</h5>' +
'<p><b>Temperature</b> '+Math.round(weatherData.main.temp)+' °F</p>' +
'<p><b>Humidity:</b> '+weatherData.main.humidity+'%</p>' +
'<p><b>Wind Speed:</b> '+Math.round(weatherData.wind.speed)+' MPH</p>' 

div.innerHTML = innerHtml
weatherCardEl.appendChild(div)

 };

 //get forecast
 var getUserInput = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "," + state + "&cnt=5&units=imperial&appid=6a22242f54371d060e263ed6f93748a9")
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayCurrentForecast(data);
      });
    } else {
      alert("Error!");
    }
})
.catch(function(error) {
  alert("unable to connect to Weather App");
});

};


 //display forecast

 var displayCurrentForecast =function (weatherData) {
  forecastCardsEl.innerHTML = ''
  
    for (var i= 0;  i < weatherData.list.length; i+=10 ) {
  
      date =[moment().add(1,'days').format('L'),moment().add(2,'days').format('L'),moment().add(3,'days').format('L'),moment().add(4,'days').format('L'),moment().add(5,'days').format('L')]
  
      for(vari=0; i<date.length; i++){
  
  
        var forecastiIconUrl = "https://openweathermap.org/img/w/" + weatherData.list[i].weather[0].icon + ".png";

  
        var div = document.createElement("div")
        div.classList.add("column")
  
                      
        var innerHtml = 

       '<div class="card">' + 
          '<div class="card-body bg-info text-light text-center border rounded-lg">' +
              '<h5><b>' + date[i] +'</b></h5>' +
              '<p><img src="' + forecastiIconUrl + '"></p>' + 
              '<p><b>Temperature:</b> '+Math.round(Math.ceil(weatherData.list[i].main.temp_max))+' °F</p>' +
              '<p><b>Low:</b> '+Math.round(Math.floor(weatherData.list[i].main.temp_min))+' °F</p>' +
             '<p><b>Humidity:</b> '+weatherData.list[i].main.humidity+'%</p>' +
             '<p><b>Wind Speed:</b> '+Math.round(weatherData.list[i].wind.speed)+' MPH</p>' +
            '</div>' +
        '</div>'
  
        div.innerHTML = innerHtml
       forecastCardsEl.appendChild(div)
      }; 
    };
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

    li.innerHTML = '<button class="list-group-item list-group-item-action search-history-btn" value="'+ cityList[i]+'">'+ cityList[i] + '</button>'

    searchHistoryListEl.appendChild(li);

  }
 
};


var searchHistoryHandler = function (event) {

  var button = (event.target);
  if (button.classList.contains("search-history-btn")) {

    getUserCity(button.value);

  }  
};



loadSearchHistory();

 //event listeners
searchHistoryListEl.addEventListener("click", searchHistoryHandler);
userFormEl.addEventListener("click", formSubmitHandler);