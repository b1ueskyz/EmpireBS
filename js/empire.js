
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
      console.log("data"); 
      console.log(data);

      var xml = data.responseXML;
      var markers = xml.documentElement.getElementsByTagName('marker');
console.log(markers);
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
            parseFloat(markers[i].getAttribute('latitude')),
            parseFloat(markers[i].getAttribute('longitude')));
         var html     = "<b>" + name + "</b><br/>" + city;

         var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
         });
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

/*
         var infoContent = document.createElement('div');
         var strong = document.createElement('strong');
         strong.textContent = name
         infoContent.appendChild(strong);
         infoContent.appendChild(document.createElement('br'));

         var text = document.createElement('text');
         text.textContent = address
         infoContent.appendChild(text);
*/
         // var icon = customLabel[type] || {};
         /*var marker = new google.maps.Marker({
                        map: map,
                   position: point,
                      label: icon.label});

         marker.addListener('click', function() {
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);});
      });
   });
}

function 
downloadUrl(url, callback) {
   var request = window.ActiveXObject  ? new ActiveXObject('Microsoft.XMLHTTP') 
                                       : new XMLHttpRequest;

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


/*
 var map;
 function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
         zoom: 2,
         center: new google.maps.LatLng(47.6062,-122.3321),
         mapTypeId: 'terrain'
   });

   // Create a <script> tag and set the USGS URL as the source.
   var script = document.createElement('script');
   script.src = 'http://54.201.224.98/EmpireBS/mappingNew.php';
   document.getElementsByTagName('head')[0].appendChild(script);
 }

 // Loop through the results array and place a marker for each
 // set of coordinates.
window.eqfeed_callback = function(results) {
   for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var marker = new google.maps.Marker({position: latLng,
                                                map: map});
   }
 }
*/
