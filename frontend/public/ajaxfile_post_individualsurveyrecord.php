<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));
//echo $data;
if ( $data === FALSE ) {
     header('HTTP/1.1 400 Bad Request');
         echo json_encode([
             'errorMessage' => 'Please provide valid JSON',
         ]);
         die;
} else {


$survey_id = $data->survey_id;
$location_longitude = $data->location_longitude;
$location_latitude = $data->location_latitude;
$survey_state = $data->survey_state;
$survey_created_time = $data->survey_created_time;
$species_name = $data->species_name;
$observation = $data->observation;
$measurement = $data->measurement;
$condition = $data->condition;
$moderatorcomment = $data->moderatorcomment;
$client_reference = $data->client_reference ;
//echo 'survey id:'.$survey_id;

$query = "SELECT SurveyID FROM survey WHERE SurveyID=$survey_id";
$sqlsearch = mysqli_query($con,$query);
//$resultcount = mysqli_num_rows($sqlsearch);
if($sqlsearch){
    
	$update_survey_query =  "UPDATE survey SET
        Longitude = $location_longitude,
        Latitude = $location_latitude,
        SurveyState = '$survey_state',
        Last_Amended_Time = '$survey_created_time',
        Species_Name = '$species_name',
        Observation = '$observation',
        Measurement = '$measurement',
        `Condition` = '$condition',
		Client_Reference = '$client_reference' 
        WHERE SurveyID = $survey_id";
		printf($update_survey_query);
	//echo $update_survey_query;
		
		mysqli_query($con,
		   $update_survey_query
		);

       // if (mysql_affected_rows($con) > 0) {
		//	echo 'Update Successfully!';
		//	printf('rows effected'.mysql_affected_rows());
	  //  } else {
		//	echo mysqli_error($con);
	//		printf($update_survey_query);
	//	}
	//	json_encode($response)
}else{

	$max_survey_id_result = mysqli_fetch_row(mysqli_query($con, "SELECT max(SurveyID) + 1 FROM Survey")) ;
	$max_survey_id =$max_survey_id_result[0];
					printf('new survey id:'.$max_survey_id);					
		$update_survey_query =
		"INSERT INTO survey (SurveyID, Longitude, Latitude, SurveyState, Last_Amended_Time, Species_Name, Observation, Measurement, `Condition`, Client_Reference, Video)
		    VALUES ($max_survey_id,'$location_longitude','$location_latitude','$survey_state','$survey_created_time','$species_name','$observation','$measurement','$condition','$client_reference','')";
		//echo $update_survey_query;
		
		printf($update_survey_query);
		mysqli_query($con, $update_survey_query ) ;

	
	
}

}
exit;
