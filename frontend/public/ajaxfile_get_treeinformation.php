<?php

include "config.php";

$condition = "";

if(isset($_GET['tree_name']) ){
   $condition = " where Name_English='".$_GET['tree_name']."'";
}

$userData = mysqli_query($con,"select * from trees ".$condition);
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
