const apikey = "cad7ec124945dcfff04e457e76760d90";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            weatherReport(data);
          });
      },
      (error) => {
        if (error.PERMISSION_DENIED) {
          const showWarnig = document.querySelector(".forecastH");
          let warning = document.createElement("div");
          warning.setAttribute("class", "warning");
          warning.textContent = "Please allow your location!";
          showWarnig.appendChild(warning);
        }
      }
    );
  }
});

//------------ Enter tne city name in the input block and searching ------------------

document.getElementById("search").addEventListener("click", () => {
  let location = document.getElementById("input").value;
  let urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

  fetch(urlSearch)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      weatherReport(data);
    });
});

//---------Adding keypress 'Enter' in the input block ------------------

const inputSearch = document.getElementById("input");

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${apikey}`;

    fetch(urlSearch)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        weatherReport(data);
      });
  }
});

//---------------- Display weather forecast at the certain area ----------------

function weatherReport(data) {
  let urlCast =
    `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` +
    `appid=${apikey}`;
  const errorMessage = document.getElementById("error");
  const nameCity = document.getElementById("city");
  const showTemp = document.getElementById("temperature");
  const showDesc = document.getElementById("clouds");

  showSpinner();

  fetch(urlCast)
    .then((res) => {
      return res.json();
    })
    .then((forecast) => {
      if (data.cod == 404) {
        errorMessage.innerText = `${data.message
          .slice(0, 1)
          .toUpperCase()}${data.message.slice(1)}`;
        errorMessage.style.display = "block";
        nameCity.innerText = "¯\\_(ツ)_/¯";
        showTemp.innerText = "-/- °C";
        showDesc.innerText = "No description";
      } else if (data.cod == 400) {
        errorMessage.innerText = `${data.message}`;
        errorMessage.style.display = "block";
        nameCity.innerText = "¯\\_(ツ)_/¯";
        showTemp.innerText = "-/- °C";
        showDesc.innerText = "No description";
      } else if (data.cod == 401) {
        errorMessage.innerText = "Something went wrong. Try again later.";
        errorMessage.style.display = "block";
        nameCity.innerText = "¯\\_(ツ)_/¯";
        showTemp.innerText = "-/- °C";
        showDesc.innerText = "No description";
      } else {
        nameCity.innerText = data.name + ", " + data.sys.country;

        showTemp.innerText = Math.floor(data.main.temp - 273) + " °C";

        showDesc.innerText = data.weather[0].description;

        let icon = data.weather[0].icon;
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.getElementById("img").src = iconUrl;

        document.getElementById("error").innerText = "";
        document.getElementById("error").style.display = "none";
      }

      hideSpinner();

      hourForecast(forecast);
      dayForecast(forecast);
    });
}

//---------------- Display forecast per hours ------------------------------

function hourForecast(forecast) {
  document.querySelector(".templist").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    var date = new Date(forecast.list[i].dt * 1000);

    let hourR = document.createElement("div");
    hourR.setAttribute("class", "next");

    let div = document.createElement("div");
    let time = document.createElement("p");
    time.setAttribute("class", "time");
    time.innerText = date
      .toLocaleTimeString(undefined, "Europe")
      .replace(":00", "");

    let temp = document.createElement("p");
    temp.innerText =
      Math.floor(forecast.list[i].main.temp_max - 273) +
      " °C" +
      " / " +
      Math.floor(forecast.list[i].main.temp_min - 273) +
      " °C";

    div.appendChild(time);
    div.appendChild(temp);

    let desc = document.createElement("p");
    desc.setAttribute("class", "desc");
    desc.innerText = forecast.list[i].weather[0].description;

    hourR.appendChild(div);
    hourR.appendChild(desc);
    document.querySelector(".templist").appendChild(hourR);
  }
}

//---------------- Display forecast per days --------------------------------

function dayForecast(forecast) {
  document.querySelector(".weekF").innerHTML = "";
  const headerForecast = document.querySelectorAll(".cast_header");

  if (screen.width > 768) {
    for (let i = 7; i < forecast.list.length; i += 8) {
      let div = document.createElement("div");
      div.setAttribute("class", "dayF bg_light");

      let day = document.createElement("p");
      day.setAttribute("class", "date");
      day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(
        undefined,
        "Europe"
      );
      div.appendChild(day);

      let temp = document.createElement("p");
      temp.innerText =
        Math.floor(forecast.list[i].main.temp_max - 273) +
        " °C" +
        " / " +
        Math.floor(forecast.list[i].main.temp_min - 273) +
        " °C";
      div.appendChild(temp);

      let description = document.createElement("p");
      description.setAttribute("class", "description");
      description.innerText = forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector(".weekF").appendChild(div);
    }
  } else {
    headerForecast[1].innerText = "Next 3 Days Forecast";

    for (let i = 7; i < forecast.list.length - 16; i += 8) {
      let div = document.createElement("div");
      div.setAttribute("class", "dayF bg_light");

      let day = document.createElement("p");
      day.setAttribute("class", "date");
      day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(
        undefined,
        "Europe"
      );
      div.appendChild(day);

      let temp = document.createElement("p");
      temp.innerText =
        Math.floor(forecast.list[i].main.temp_max - 273) +
        " °C" +
        " / " +
        Math.floor(forecast.list[i].main.temp_min - 273) +
        " °C";
      div.appendChild(temp);

      let description = document.createElement("p");
      description.setAttribute("class", "description");
      description.innerText = forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector(".weekF").appendChild(div);
    }
  }
}

// ----- ShowSpinner -----
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
// ----- HideSpinner -----
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
