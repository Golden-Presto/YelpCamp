const map = L.map('map');

L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${maptilerApiKey}`, {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

const markers = L.markerClusterGroup();
const bounds = L.latLngBounds(); // ✅ Correctly initialized

campgrounds.features.forEach(feature => {
    const [lng, lat] = feature.geometry.coordinates;
    const { title, description } = feature.properties;

    if (lat && lng) {
        const marker = L.marker([lat, lng])
            .bindPopup(`<strong>${title}</strong><br>${description}`);
        markers.addLayer(marker);
        bounds.extend([lat, lng]);
    }
});

map.addLayer(markers);

// ✅ Use isValid() to check if bounds contain any points
if (bounds.isValid()) {
    map.fitBounds(bounds);
} else {
    map.setView([22.493304, 88.384468], 3); // fallback view
}
