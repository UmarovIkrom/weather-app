"use strict";

const api = {
    key: "f76d7777147d98fb9ff61162d9b486ba",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keypress', setQuery)

function setQuery(e) {
    if(e.keyCode == 13) {
        getResults(searchInput.value);
        console.log(searchInput.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let highlow = document.querySelector('.high-low');
    highlow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuilder(e) {
    let months = [
        "January",
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December",
    ];
       
    let days =[
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturdayr",
    ];

    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`;
      
}
