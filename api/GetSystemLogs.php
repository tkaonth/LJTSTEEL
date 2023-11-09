<?php
include 'config.php';
if (!empty($_POST['searchTerm'])) {
    $searchTerm = $_POST['searchTerm'];
    $query = "SELECT CONVERT(NVARCHAR, Al_Datetime, 103) + ':' + Al_Formname + ':' + Al_Action + ':' + Al_DocumentID + ':BFQty' + CONVERT(NVARCHAR, Al_Befor) + ':AFQty' + CONVERT(NVARCHAR, Al_After) As i_String_Log, Al_Str_Befor, Al_Str_After, Al_Device, Al_IPAddress, Al_Application, Al_Log_By, Us_StringID, Us_UserName, Al_Remark ,Al_Datetime
            FROM tbl_Active_Log LEFT OUTER JOIN tbl_Users ON Al_Log_By = Us_ID
            WHERE CONVERT(NVARCHAR, Al_Datetime, 103) LIKE '%$searchTerm%' OR
            Al_Formname LIKE '%$searchTerm%' OR
            Al_Action LIKE '%$searchTerm%' OR
            Al_DocumentID LIKE '%$searchTerm%' OR
            Al_Befor LIKE '%$searchTerm%' OR
            Al_After LIKE '%$searchTerm%' OR
            Al_Str_Befor LIKE '%$searchTerm%' OR
            Al_Str_After LIKE '%$searchTerm%' OR
            Al_Device LIKE '%$searchTerm%' OR
            Al_IPAddress LIKE '%$searchTerm%' OR
            Al_Application LIKE '%$searchTerm%' OR
            Al_Log_By LIKE '%$searchTerm%' OR
            Us_StringID LIKE '%$searchTerm%' OR
            Us_Nickname LIKE '%$searchTerm%' OR
            Al_Remark LIKE '%$searchTerm%'
            ";
} else {
    $query = "SELECT CONVERT(NVARCHAR, Al_Datetime, 103) + ':' + Al_Formname + ':' + Al_Action + ':' + Al_DocumentID + ':BFQty' + CONVERT(NVARCHAR, Al_Befor) + ':AFQty' + CONVERT(NVARCHAR, Al_After) As i_String_Log, Al_Str_Befor, Al_Str_After, Al_Device, Al_IPAddress, Al_Application, Al_Log_By, Us_StringID, Us_UserName, Al_Remark ,Al_Datetime
            FROM tbl_Active_Log LEFT OUTER JOIN tbl_Users ON Al_Log_By = Us_ID ORDER BY Al_Datetime DESC";
}

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
