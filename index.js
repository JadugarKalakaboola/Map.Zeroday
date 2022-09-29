
var map = L.map('map');

let darkMode = false


const tiles = ['https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png','http://{s}.tile.osm.org/{z}/{x}/{y}.png']
L.tileLayer(darkMode ? tiles[0] : tiles[1]).addTo(map);