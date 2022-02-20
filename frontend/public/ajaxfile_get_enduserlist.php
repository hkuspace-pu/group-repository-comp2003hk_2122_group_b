<?php

include "config.php";


$condition = "";

if(isset($_GET['Created_Time_From']) and isset($_GET['Created_Time_To'])){
   $condition = " where Created_Time>=".$_GET['Created_Time_From']." and Created_Time<=".$_GET['Created_Time_To'] ;
} 

$userData = mysqli_query($con,"select username,name,email,role from users ".$condition);
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
