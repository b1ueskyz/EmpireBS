
function 
initMap() {
   var map = new google.maps.Map(document.getElementById('map'), 
      {center: new google.maps.LatLng(47.6062, -122.3321),
         zoom: 10});

   var infoWindow = new google.maps.InfoWindow;
   var bounds = new google.maps.LatLngBounds();

   // Change this depending on the name of your PHP or XML file
   downloadUrl('http://54.201.224.98/EmpireBS/mappingNew.php', 
   function(data) {
      // console.log("data"); 
      // console.log(data);

      var xml = data.responseXML;
      var markers = xml.documentElement.getElementsByTagName('marker');
// console.log(markers);
      // Array.prototype.forEach.call(markers, function(markerElem) {
      for (var i = 0; i < markers.length; i++) {
         var id       = markers[i].getAttribute('id');
         var name     = markers[i].getAttribute('name');
         var address  = markers[i].getAttribute('address');
         var city     = markers[i].getAttribute('city');
         var state    = markers[i].getAttribute('state');
         var phone    = markers[i].getAttribute('phone');
         var website  = markers[i].getAttribute('website');
         var point    = new google.maps.LatLng(
            parseFloat(markers[i].getAttribute('lat')),
            parseFloat(markers[i].getAttribute('lng')));
         var html     = "<b>" + name + "</b><br/>" + city + "<br/>" + phone + "<br/>" + website;

         var marker = new google.maps.Marker({
            map: map,
            position: point,
            title:'Hello'
         });
// console.log(markers[i]);
         bindInfoWindow(marker, map, infoWindow, html);
         bounds.extend(marker.position);
      }
      map.fitBounds(bounds);
   });
}

function 
bindInfoWindow(marker, map, infoWindow, html) {
   google.maps.event.addListener(marker, 'click', function() {
     infoWindow.setContent(html);
     infoWindow.open(map, marker);
   });
 }

 function 
 downloadUrl(url, callback) {
   var request = window.ActiveXObject ?
       new ActiveXObject('Microsoft.XMLHTTP') :
       new XMLHttpRequest;

   request.onreadystatechange = function() {
     if (request.readyState == 4) {
       request.onreadystatechange = doNothing;
       callback(request, request.status);
     }
   };

   request.open('GET', url, true);
   request.send(null);
 }

 function 
 doNothing() {}

