<?php
include 'config.php';
$data = [];
$query = "SELECT Bn_ID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN
FROM tbl_Branch WHERE Bn_ID <> 'TS' ORDER BY Bn_ID";
// Execute the query
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
} else {

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
