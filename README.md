# Earthquake-Data-Viz-Leaflet.js

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

### Contents
1) Javascript logic
    Using Leaflet.js, we create a map showing earthquakes from the USGS data set based on their longitude and latitude.

    The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

    When clicked, each marker has popups that provide additional information about the earthquake when a marker is clicked.

    On the bottom right, there is a legend that provides context for the earthquake data.

1) HTML index page

1) CSS styling page