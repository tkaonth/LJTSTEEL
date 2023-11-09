<?php
include 'config.php';
if(!empty($_POST['daterange'])){
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

}else {
    $today = date('d/m/Y');
    $startDate = $today;
    $endDate = $today;

}

//dd($dateArray);


//dd($endDate);
$data = [];

// แปรงค่าสตริงเป็นวันที่ในรูปแบบ Y-m-d
$startDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $startDate)));
$endDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $endDate)));

// $query = "SELECT Se_Date,Cs_CustomerID FROM tbl_Sell WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat'";

$query = "SELECT Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_Amount, Ss_Paid, Ss_Discount, Ss_Total, Ss_Remaining, Ss_Payment_Medthod, Ss_Bank 
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID
LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID
LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO
LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo
WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND Se_Status IN ('2','3')
GROUP BY Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_Amount, Ss_Paid, Ss_Discount, Ss_Total, Ss_Remaining, Ss_Payment_Medthod, Ss_Bank
ORDER BY Se_Date";
// Execute the query
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
}else{

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);

}



