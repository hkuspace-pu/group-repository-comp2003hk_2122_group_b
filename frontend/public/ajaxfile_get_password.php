<?php

include "config.php";

$condition = "";

if(isset($_GET['username']) and isset($_GET['password'])){
   $condition = " where username>=".$_GET['username']." and password=".$_GET['password'] ;
}

$userData = mysqli_query($con,"select username, password from users ".$condition);
if (!$userData) {
    printf("Error: %s\n", mysqli_error($con));
    printf("Sql statement:" + $condition);
    exit;

} else {

$response = array();
while($row = mysqli_fetch_assoc($userData)){
   $response[] = $row;
}

echo json_encode($response);
exit;

}
