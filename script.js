let weather = {
    apiKey: "be018c5e8b71f6856f83bae654b6bc60",
    fetchWeather: function(city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const{name} = data.city;
        const{icon, description} = data.list[0].weather[0];
        const{temp, humidity} = data.list[0].main;
        const{speed} = data.list[0].wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = ("http://openweathermap.org/img/wn/" + icon + ".png")
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
    },
    

};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Denver");