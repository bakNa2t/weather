const apikey = 'cad7ec124945dcfff04e457e76760d90';
 
window.addEventListener("load", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

            fetch(url).then(res => {
                return res.json()
            }).then((data) => {
                // console.log(data);
                weatherReport(data);
            })
        })
    }
})

//------------ Enter tne city name in the input block and searching ------------------

document.getElementById('search').addEventListener('click', () => {
    var place = document.getElementById('input').value;
    
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch).then(res => {
        return res.json()
    }).then((data) => {
        console.log(data);
        weatherReport(data);
    })
})

//---------Adding keypress 'Enter' in the input block ------------------

const inputSearch = document.getElementById('input');

inputSearch.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        console.log(e.target.value);
        var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${apikey}`; 

        fetch(urlsearch).then(res => {
            return res.json()
        }).then((data) => {
            console.log(data);
            weatherReport(data);
        })
    }
})

//---------------- Display weather forecast at the certain area ----------------

function weatherReport(data){
    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then(res => {
        return res.json()
    }).then((forecast) => {
        // console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);

        document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
       
        document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';
        
        document.getElementById('clouds').innerText = data.weather[0].description;
        
        let icon = data.weather[0].icon;
        let iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.getElementById('img').src = iconurl;
    })
}

//---------------- Display forecast per hours ------------------------------

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML = '';
    for(let i = 0; i < 5; i++){
        var date = new Date(forecast.list[i].dt*1000);

        let hourR = document.createElement('div');
        hourR.setAttribute('class','next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class','time');
        time.innerText = (date.toLocaleTimeString(undefined, 'Europe')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

//---------------- Display forecast per days --------------------------------

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML = '';

    for(let i = 7; i < forecast.list.length; i += 8){
        // console.log(forecast.list[i]);

        let div = document.createElement('div');
        div.setAttribute('class','dayF bg_light');

        let day = document.createElement('p');
        day.setAttribute('class','date');
        day.innerText = new Date(forecast.list[i].dt*1000).toDateString(undefined, 'Europe');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273) + ' °C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class','description');
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }

}