// Create map object with options
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
  });
  
// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 12,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(myMap);
  
// Convert UNIX Timestamp to Date String
function convertTimestamp(timestamp) {

    var dateObject = new Date(timestamp)
    
    var humanDateFormat = dateObject.toLocaleString() 

    return humanDateFormat
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(response => {
    //Access Data
    var data = response.features;

    // Loop through Earthquake entries
    data.forEach(d => {

        // Access Properties
        var properties = d.properties;
        // Get Features
        var magnitude = properties.mag;

        var msec = properties.time;

        // Get Location
        var location = properties.place;

        // Get URL
        var info = properties.url;

        // Access Geometry
        var geo = d.geometry;

        // Get Coordinates
        var lat = geo.coordinates[0];
        var long = geo.coordinates[1];

         // Assign color based on Magnitude
        function chooseColor(mag) {
            var color;
            if (mag >= 5) {
                color = "red"
            } else if (mag >= 4) {
                color = "orange"
            } else if (mag >= 3) {
                color = "yellow"
            } else if (mag >= 2) {
                color = "lightgreen"
            } else {
                color = "green"
            }
            return color
        };

        L.circle([long, lat],
            {
                fillOpacity: 0.75,
                weight: 1,
                color: "black",
                fillColor: chooseColor(magnitude),
                radius: magnitude* 9000
              }).bindPopup(`<h4>Location: </h4><p>${location}</p> <hr> <h4>Date/Time: </h4><p>${convertTimestamp(msec)}</p> <hr> <h4>Magnitude:</h4><p>${magnitude}</p> <hr> <h4>More Info: </h4> <p>${info}</p>`).addTo(myMap)
    })

})

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<i style="background: red"></i> 5 <br>';
    div.innerHTML += '<i style="background: orange"></i> 4 to 4.9 <br>';
    div.innerHTML += '<i style="background: yellow"></i> 3 to 3.9 <br>';
    div.innerHTML += '<i style="background: lightgreen"></i> 2 to 2.9 <br>';
    div.innerHTML += '<i style="background: green"></i> 0 to 1.9 <br>';


    return div;
};

legend.addTo(myMap);