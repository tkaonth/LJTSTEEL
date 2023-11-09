<?php
include 'config.php';
$query = "";
if (!empty($_POST['daterange'])) {
    $dateArray = preg_split("/ to | to/", $_POST['daterange']);
    $startDate = $dateArray[0];
    if (count($dateArray) > 1) {
        if ($dateArray[1] != '') {
            $endDate = $dateArray[1];
        } else {
            $endDate = $dateArray[0];
        }

    } else {
        $endDate = $dateArray[0];
    }

} else {
    $today = date('d/m/Y');
    $startDate = $today;
    $endDate = $today;
    // $startDate = "01/10/2023";
    // $endDate = "14/10/2023";

}

$startDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $startDate)));
$endDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $endDate)));


if (!empty($_POST['daterange'])) {
    $query = "SELECT * ,CONVERT(varchar(10),Qt_Date,105 ) AS C_Date
        FROM tbl_Qaotation LEFT OUTER JOIN tbl_Customers ON Qt_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Branch ON Qt_BranchID = Bn_ID
        WHERE CONVERT(DATE, Qt_Date) BETWEEN '$startDateFormat' AND '$endDateFormat' AND Qt_BranchID <> 'TS'
        ORDER BY Qt_BranchID,Qt_Date,Qt_QaotationID,Qt_Sequence";
} else {
    $query = "SELECT * ,CONVERT(varchar(10),Qt_Date,105 ) AS C_Date
        FROM tbl_Qaotation LEFT OUTER JOIN tbl_Customers ON Qt_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Branch ON Qt_BranchID = Bn_ID
        WHERE CONVERT(DATE, Qt_Date) BETWEEN '$startDateFormat' AND '$endDateFormat' AND Qt_BranchID <> 'TS'
        ORDER BY Qt_BranchID,Qt_Date,Qt_QaotationID,Qt_Sequence";

}

//dd($dateArray);

//dd($endDate);
// $data = [];
$groupedData = array();


// Execute the query
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
} else {

    // while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    //     $data[] = $row;
    // }
    // echo json_encode($data);

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        $qaotationID = $row['Qt_QaotationID'];

        // Check if the key for this $qaotationID exists in the array
        if (!isset($groupedData[$qaotationID])) {
            $groupedData[$qaotationID] = array();
        }

        // Add the current row to the array with the matching $qaotationID
        $groupedData[$qaotationID][] = $row;
    }
    echo json_encode($groupedData);



}
