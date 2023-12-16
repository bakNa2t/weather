<h1 align="center"> Weather web aplication using OpenWeatherMap API</h1>

#### What has been implemented:

- weather app has responsive screen width for mobile and desktop
- used grid to display main content for certain location, hourly and days forecast
- changing the screen size <code>dayForecast</code> function changes the number of days shown in the daily forecast (a screen smaller than 769px shows a 3 day forecast else a 5 day forecast)
- using <code>Fetch</code> API to get data from OpenWeatherMap API and display weather forecast
- if geolocation denied in the browser error <code>PERMISSION_DENIED</code> displays at the screen app
- if search input is empty error <code>Nothing to geocode</code> displays at the screen app
- if location doesn't exist error <code>City not found</code> displays at the screen app
- added <code>Spinner</code> element before <code>Fetch</code> API get data form OpenWeatherMap.org
- dynamically adding page <code>DOM</code> elements when receiving data
- with <code>checkUserAgent</code> function defined user browser and if it's Opera Mini it will update CSS properties
- click here to see => [_**WeatherApp**_](https://bakna2t.github.io/weather/)

---

<div align="center">
    <p style="width: 500px;">
        <a href="https://bakna2t.github.io/weather/">
            <img alt="Weather WebApp" src ="./image/weather_baner.png">
        </a>
    </p>
</div>
