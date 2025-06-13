// Initialize the Leaflet map
const map = L.map('map').setView([campground.geometry.coordinates[1], campground.geometry.coordinates[0]], 10);

// Add a tile layer using MapTiler
L.tileLayer(`https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=${maptilerApiKey}`, {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// Add a marker with a popup
L.marker([campground.geometry.coordinates[1], campground.geometry.coordinates[0]])
    .addTo(map)
    .bindPopup(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
    .openPopup();

console.log(campground.geometry);
