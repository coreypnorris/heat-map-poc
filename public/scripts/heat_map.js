// TODO: import data from another file

var map, heatmap, rexelZips, rexelLatLngs;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.775, lng: -122.434},
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  rexelZips = App.rexel_zips();
  zipToLatLng = App.zip_to_lat_lng();
  rexelLatLngs = [];
  nulls = [];
  
  var arrayLength = rexelZips.length;
  for (var i = 0; i < arrayLength; i++) {
    var subString = rexelZips[i].substring(0, 5);
    var latLng = zipToLatLng[subString];
    if (typeof latLng === "undefined") {
      nulls.push(i);
    }
    else {
      rexelLatLngs.push(new google.maps.LatLng(latLng.lat, latLng.lng));
    }
  }

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: rexelLatLngs,
    map: map
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}