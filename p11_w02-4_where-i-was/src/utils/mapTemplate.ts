export const getMapHtml = (initialLat: number, initialLon: number) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map = L.map('map').setView([${initialLat}, ${initialLon}], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var userMarker = null;
        var historyMarkers = [];

        // Custom icon for user location
        var userIcon = L.divIcon({
            className: 'user-marker',
            html: '<div style="background-color: #2196F3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        function updateUserLocation(lat, lon) {
            if (userMarker) {
                userMarker.setLatLng([lat, lon]);
            } else {
                userMarker = L.marker([lat, lon], {icon: userIcon}).addTo(map);
            }
            // Optional: Keep map centered on user? Maybe not always.
            // map.setView([lat, lon]); 
        }

        function setHistoryMarkers(locations) {
            // Clear existing markers
            historyMarkers.forEach(m => map.removeLayer(m));
            historyMarkers = [];

            locations.forEach(loc => {
                var marker = L.marker([loc.lat, loc.lon])
                    .bindPopup('<b>' + (loc.name || 'Unknown') + '</b><br>' + (loc.userNote || 'No note'));
                marker.addTo(map);
                historyMarkers.push(marker);
            });
        }

        // Handle messages from React Native
        window.addEventListener("message", function(event) {
            try {
                var data = JSON.parse(event.data);
                if (data.type === 'UPDATE_USER_LOCATION') {
                    updateUserLocation(data.payload.lat, data.payload.lon);
                } else if (data.type === 'SET_HISTORY') {
                    setHistoryMarkers(data.payload);
                } else if (data.type === 'CENTER_MAP') {
                    map.setView([data.payload.lat, data.payload.lon], 15);
                }
            } catch (e) {
                console.error("Error parsing message", e);
            }
        });
    </script>
</body>
</html>
`;
