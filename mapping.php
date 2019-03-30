<?php
// Get a connection for the database
require_once('mysql_connect.php');


$query = "SELECT *
            FROM stores
				  ORDER BY id DESC
				     LIMIT 100";

// echo ($query);

$response = @mysqli_query($dbc, $query);

if ($response) {
   echo ("<table style=' border-spacing: 5px;'>");

   echo ("<tr>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>license</th>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>name</th>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>city</th>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>state</th>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>lat</th>");
      echo ("<th style='border: 1px solid black; padding: 5px;'>lon</th>");
   echo ("</tr>");

   while ($row = mysqli_fetch_array($response)) {
         $license = $row['license'];
         $name    = $row['name'];
         $city    = $row['city'];
         $state   = $row['state'];
         $lat     = $row['latitude'];
         $lon     = $row['longitude'];

         echo ("<tr>");
            echo ("<td style='border: 1px solid black; padding: 5px;'>$license</td>");
            echo ("<td style='border: 1px solid black; padding: 5px;'>$name</td>");
            echo ("<td style='border: 1px solid black; padding: 5px;'>$city</td>");
            echo ("<td style='border: 1px solid black; padding: 5px;'>$state</td>");
            echo ("<td style='border: 1px solid black; padding: 5px;'>$lat</td>");
            echo ("<td style='border: 1px solid black; padding: 5px;k'>$lon</td>");
         echo ("</tr>");
      }
   }
   echo ("</table>");

mysqli_close($dbc);
















?>
