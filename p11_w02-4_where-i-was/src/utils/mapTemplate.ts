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
        .crosshair {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            margin-left: -20px;
            margin-top: -20px;
            pointer-events: none;
            z-index: 1000;
        }
        .crosshair::before,
        .crosshair::after {
            content: '';
            position: absolute;
            background-color: #FF5722;
        }
        .crosshair::before {
            left: 50%;
            top: 0;
            width: 2px;
            height: 100%;
            margin-left: -1px;
        }
        .crosshair::after {
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            margin-top: -1px;
        }

    </style>
</head>
<body>
    <div class="crosshair"></div>
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

        // Custom icon for history markers (Flag)
        var historyIcon = L.divIcon({
            className: 'history-marker',
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#D32F2F" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
            iconSize: [32, 32],
            iconAnchor: [4, 32], // Anchor at the bottom of the pole
            popupAnchor: [12, -20]
        });

function setHistoryMarkers(locations) {
    // Clear existing markers
    historyMarkers.forEach(m => map.removeLayer(m));
    historyMarkers = [];

    locations.forEach(loc => {
        var marker = L.marker([loc.lat, loc.lon], { icon: historyIcon })
            .bindPopup('<b>' + (loc.name || 'Unknown') + '</b><br>' + (loc.userNote || 'No note') + '<br><small>' + new Date(loc.startTime).toLocaleString() + '</small>');
        marker.addTo(map);
        historyMarkers.push(marker);
    });
}

function log(msg) {
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOG', payload: msg }));
    }
}

// Send map center to React Native when map moves
map.on('moveend', function() {
    var center = map.getCenter();
    if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'MAP_CENTER_CHANGED',
            payload: { lat: center.lat, lon: center.lng }
        }));
    }
});

function handleMessage(event) {
    try {
        log("Received message: " + event.data);
        var data = JSON.parse(event.data);
        if (data.type === 'UPDATE_USER_LOCATION') {
            updateUserLocation(data.payload.lat, data.payload.lon);
        } else if (data.type === 'SET_HISTORY') {
            log("Setting history markers: " + data.payload.length);
            setHistoryMarkers(data.payload);
        } else if (data.type === 'CENTER_MAP') {
            map.setView([data.payload.lat, data.payload.lon], 15);
        }
    } catch (e) {
        log("Error parsing message: " + e.toString());
    }
}

// Handle messages from React Native (support both iOS and Android)
window.addEventListener("message", handleMessage);
document.addEventListener("message", handleMessage);
</script>
    </body>
    </html>
        `;
