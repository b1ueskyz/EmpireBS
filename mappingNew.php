<?php
//Start xml file, create parent node
$dom     = new DOMDocument("1.0");
$node    = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Get a connection for the database
require_once('mysql_connect.php');

$query = "SELECT *
            FROM stores
		  ORDER BY id DESC
			  LIMIT 3";

// echo $query;

$response = @mysqli_query($dbc, $query);

header("Content-type: text/xml");

// Iterate through the rows
while ($row = mysqli_fetch_assoc($response)){
   // ADD TO XML DOCUMENT NODE
   $node = $dom->createElement("marker");
   $newnode = $parnode->appendChild($node);
   $newnode->setAttribute("name",$row['name']);
   $newnode->setAttribute("address", $row['address']);
   $newnode->setAttribute("lat", $row['latitude']);
   $newnode->setAttribute("lng", $row['longitude']);
 }
 echo $dom->saveXML();
 
/*
if ($response) {
   echo ("<markers>");

   while ($row = mysqli_fetch_array($response)) {
      $id = $row['id'];
      $name = $row['name'];
      $address = $row['address'];
      $city = $row['city'];
      $phone = $row['phone'];
      $website = $row['website'];
      $latitude = $row['latitude'];
      $longitude = $row['longitude'];

      echo ("<marker id='" . $id        . "' 
                   name='" . $name      . "'
                address='" . $address   . "'
                   city='" . $city      . "'
                  phone='" . $phone     . "'
                website='" . $website   . "'
               latitude='" . $latitude  . "'
              longitude='" . $longitude . "'" . " />");
   }

   echo ("</markers>");
}
else {echo "no response";}
*/

/*
if ($response) {
   while ($row = mysqli_fetch_assoc($response)) {
      echo print_r($row);
   }
}
*/
mysqli_close($dbc);


/*
(function() {

	window.onload = function() {

		// Creating a new map
		var map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(57.9, 14.6),
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });


		// Creating the JSON data
		var json = [
		    {
		        "title": "Stockholm",
		        "lat": 59.3,
		        "lng": 18.1,
		        "description": "<strong>Stockholm</strong> is the capital and the largest city of Sweden and constitutes the most populated urban area in Scandinavia with a population of 2.1 million in the metropolitan area (2010)"
		    },
		    {
		        "title": "Oslo",
		        "lat": 59.9,
		        "lng": 10.8,
		        "description": "<strong>Oslo</strong> is a municipality, and the capital and most populous city of Norway with a metropolitan population of 1,442,318 (as of 2010)."
		    },
		    {
		        "title": "Copenhagen",
		        "lat": 55.7,
		        "lng": 12.6,
		        "description": "<strong>Copenhagen</strong> is the capital of Denmark and its most populous city, with a metropolitan population of 1,931,467 (as of 1 January 2012)."
		    }
		]

		// Creating a global infoWindow object that will be reused by all markers
		var infoWindow = new google.maps.InfoWindow();

		// Looping through the JSON data
		for (var i = 0, length = json.length; i < length; i++) {
			var data = json[i],
				latLng = new google.maps.LatLng(data.lat, data.lng);

			// Creating a marker and putting it on the map
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: data.title
			});

			// Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
			(function(marker, data) {

				// Attaching a click event to the current marker
				google.maps.event.addListener(marker, "click", function(e) {
					infoWindow.setContent(data.description);
					infoWindow.open(map, marker);
				});


			})(marker, data);

		}

	}

})();
*/