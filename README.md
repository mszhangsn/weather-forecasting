# Application overview
This is a weather forecasting web application that displays the current weather and 5-day forecast in New York, San Francisco, London, Amsterdam, and Sydney. This web application is using React framework and OpenWeatherMap API. 

# Pages and functionalities
There are seven pages, including an overview page, five weather forecasting pages, and a NotFound page.

Overview page displays the current weather in those five cities and provides links to the detail page.

Weather forecasting page displays 5-day forecast with description and line charts. Line charts show the temperature forecasting per three hours in one day. Users can choose a different date to see the detail hourly forecasting.

The NotFound page is for handling wrong URLs users randomly input. It will have a decent NotFound page instead of massive error messages.

# JS files structure
- index.js
  - top_bar.js
  - home_page.js
    - weather_overview.js
  - weather_forecast_page.js
    - one_day_forecast.js
    - weather_line_chart.js
    - no_match_page.js
- cities.js
- weather_icons.js
- APIkey.js 
