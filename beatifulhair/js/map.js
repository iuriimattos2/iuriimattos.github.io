function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(-8.0631495, -34.87131120000004),
    zoom: 10
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}
