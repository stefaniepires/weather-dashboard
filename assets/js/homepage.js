var getUserCity = function(city, state) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&units=imperial&appid=dfda35368bbd4b6f36f9ed7f2ede83c5").then( function (response) {
    response.json().then(function(data) {
      console.log(data);
      });
  });

}




//var for the form: <form> and <input> elements
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");

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

//event listener to userFormEl
userFormEl.addEventListener("submit", formSubmitHandler);