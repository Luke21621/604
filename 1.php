<?php
$servername = "sql308.infinityfree.com"; // Replace with your server name or IP address
$username = "if0_37528995"; // Replace with your MySQL username
$password = "NNCNxWVi4vZX"; // Replace with your MySQL password
$dbname = "if0_37528995_work2"; // Replace with your database name
 
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
 
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} else {
  echo "Connected successfully";
}
 
// Close the connection
$conn->close();
 
?>
 
<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
 
<body>
  <h1>hello</h1>
</body>
 
</html>
