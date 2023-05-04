mapboxgl.accessToken = 'pk.eyJ1IjoiYWx0YWlyc3BhY2V3b3JrcyIsImEiOiJjbGg2Z2ppb3cwNjJpM2VxeWt0b25iNWxzIn0.ZTWrq3o3dRIBQIADs8vObQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [16.363449, 48.210033], // Example longitude and latitude
    zoom: 8,
    attributionControl: false
});

var marker = new mapboxgl.Marker()
    .setLngLat([16.363449, 48.210033])
    .addTo(map);
