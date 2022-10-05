
var map = L.map('map');

let darkMode = false

let totalDistance = 0
let totalCostSelf = 0
let switchBtn = document.getElementById('switch')
let totalCostPublic = 0
let averageCostPerKm = 6
let fixedCharge = 20

const tiles = ['https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png','http://{s}.tile.osm.org/{z}/{x}/{y}.png']
L.tileLayer(darkMode ? tiles[0] : tiles[1]).addTo(map);

var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(28.6131, 77.2248),
		L.latLng(28.6562, 77.2410)
	],
	geocoder: L.Control.Geocoder.nominatim(),
	routeWhileDragging: true,
	reverseWaypoints: true,
	showAlternatives: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'white', opacity: 0.8, weight: 6},
			{color: 'blue', opacity: 0.5, weight: 2}
		]
	}
})).addTo(map);

control.on('routeselected', function (e) {
	var routes = e.route;
	var summary = routes.summary;
	totalDistance = summary.totalDistance / 1000
	totalTime =  Math.round(summary.totalTime % 3600 / 60)
	totalCostSelf = averageCostPerKm * totalDistance
	totalCostPublic = totalCostSelf + fixedCharge
	console.log(Math.round(totalCostSelf*100)/100 , totalCostPublic)
	document.getElementsByClassName('leaflet-routing-alt').id += 'detail-stats'

	// alert distance and time in km and minutes
	console.log('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
});


L.Routing.errorControl(control).addTo(map);

function toggleDarkMode(){
	darkMode = !darkMode
	console.log(darkMode)
	L.tileLayer(darkMode ? tiles[0] : tiles[1]).addTo(map);
	darkMode ? document.getElementsByClassName('leaflet-routing-container')[0].style.backgroundColor = "rgba(255, 255, 255, 0.6)" : document.getElementsByClassName('leaflet-routing-container')[0].style.backgroundColor = "rgba(106, 147, 174, 0.066)"
	darkMode ? document.getElementById('switch-img').src = './images/sun.gif' : document.getElementById('switch-img').src = './images/moon.gif'
}

switchBtn.addEventListener('click', toggleDarkMode)