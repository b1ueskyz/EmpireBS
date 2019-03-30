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
			  LIMIT 100";

// echo $query;

$response = @mysqli_query($dbc, $query);

header("Content-type: text/xml");

// Iterate through the rows
while ($row = mysqli_fetch_assoc($response)){
   // ADD TO XML DOCUMENT NODE
   $node    = $dom->createElement("marker");
	$newnode = $parnode->appendChild($node);
	
   $newnode->setAttribute("name",    $row['name']);
   $newnode->setAttribute("address", $row['address']);
   $newnode->setAttribute("city",    $row['city']);
   $newnode->setAttribute("phone",   $row['phone']);
   $newnode->setAttribute("website", $row['website']);
   $newnode->setAttribute("lat",     $row['latitude']);
   $newnode->setAttribute("lng",     $row['longitude']);
 }
 
 echo $dom->saveXML();
 
 mysqli_close($dbc);

 ?>