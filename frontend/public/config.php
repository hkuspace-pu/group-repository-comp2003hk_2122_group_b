<?php
/*standalone version*/
$host = "localhost:3307";    /* Host name */
$user = "root";         /* User */
$password = "752372";         /* Password */
$dbname = "tree_project_test";   /* Database name */

// Create connection
$con = mysqli_connect($host,  $user, $password,$dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

