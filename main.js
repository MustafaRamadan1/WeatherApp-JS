let input = document.querySelector('input[type = "text"]');
let searchBtn = document.getElementById('searchBtn');
let temp = document.getElementsByClassName('temp')[0];
let city = document.getElementsByClassName('city')[0];
let humidity = document.getElementsByClassName('humidity')[0];
let wind = document.getElementsByClassName('wind')[0];
let mainImage = document.getElementsByClassName('weather-icon')[0];
let weatherClass = document.getElementsByClassName('weather')[0];

let cityName = ""
let weather = "";
let ApiKey = "cb7c2abd5550323d12b6b81b04992859";

input.addEventListener('change', function (){

    cityName = this.value;  // input.value   
})



searchBtn.addEventListener('click', function(){
    

    if (cityName == "")
    {
        alert("Please enter a valid value");
    }
    else{
        console.log(cityName);
        FetchData();
    }
   
})


input.addEventListener('keydown', function (e){

   if (e.keyCode == 13)
   {
    e.preventDefault();
    cityName = this.value;
    FetchData();
   }

}
)



async function FetchData(){

    
   weather  =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&units=metric`)
    .then(res=>res.json())

    if (weather.cod === "404" ) alert(`you enter not valid city name`);

    UpdateWeather(weather);
    switch(weather.weather[0].main)
    {
        case 'Clear':
            mainImage.src = `./images/clear.png`;
            break;
        case 'Clouds':
            mainImage.src = `./images/clouds.png`;

    }

    weatherClass.style.display = "block";

}


function UpdateWeather(weather)
{
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`;
    city.innerHTML = weather.name;
    humidity.innerHTML = `${weather.main.humidity}%`;
    wind.innerHTML = `${Math.round(weather.wind.speed)} Km/Hr`;
}

