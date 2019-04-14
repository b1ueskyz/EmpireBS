
function 
initMap() {
   var map = new google.maps.Map(document.getElementById('map'), 
      {center: new google.maps.LatLng(47.6062, -122.3321),
         zoom: 8});

   var infoWindow = new google.maps.InfoWindow;
   var bounds = new google.maps.LatLngBounds();
   var icon = {
      url: "images/mapIcon.svg",
      anchor: new google.maps.Point(25,50),
      scaledSize: new google.maps.Size(40,40)
  }


   // Change this depending on the name of your PHP or XML file
   downloadUrl('https://www.empireexperience.com/EmpireBS/mappingNew.php', 
   function(data) {

      var xml = data.responseXML;
      var markers = xml.documentElement.getElementsByTagName('marker');

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

    var html = "<div style='background-color:#2199D2; color:white;'><b>" 
               + name 
               + "</b><br/>" 
               + address 
               + "<br/>" 
               + city 
               + "<br/>" 
               + phone 
               + "<br/>" 
               + "<a target='_blank' href=http://" 
               + website  
               + ">" 
               +  website 
               + "</a></div";
      //   var html     = "<b>" + name + "</b><br/>" + city + "<br/>" + phone + "<br/>" + website;

 
         var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon
         });

         bindInfoWindow(marker, map, infoWindow, html);
         bounds.extend(marker.position);
      }
//      map.fitBounds(bounds);
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

