<?php
include 'config.php';


// $query = "SELECT Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_DepositID, Dp_Amount, (Ss_Paid - Dp_Amount) As i_Remain, Ss_InvoiceNO, Ss_Paid, Ss_Discount, Ss_Total,Ss_Grand_Total, Ss_Remaining, Se_Invoice_Date, Se_InvoiceNO, Ss_Payment_Medthod, Di_Date, Di_Delivery_ID, Ss_Bank 
// FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID
// LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID
// LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO
// LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo
// LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
// WHERE Se_Invoice_Date BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND (Ss_Paid + Dp_Amount) > 0
// GROUP BY Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_DepositID, Dp_Amount, (Ss_Paid - Dp_Amount), Ss_Paid, Ss_InvoiceNO, Ss_Discount, Ss_Total,Ss_Grand_Total, Ss_Remaining, Se_Invoice_Date, Se_InvoiceNO, Ss_Payment_Medthod, Di_Date, Di_Delivery_ID, Ss_Bank
// ORDER BY Se_Invoice_Date";,CONVERT(varchar(10),Qt_Date,105 ) AS C_Date
// $query = "SELECT * FROM tbl_Sell_Summary";

$query = "SELECT *,CONVERT(varchar(10),Ss_Date,105 ) AS C_Date FROM tbl_Sell LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID
        LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID WHERE Se_SellNo = 'RI032311-060'";


$groupedData = array();

// Execute the query
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
}else{

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        echo '<pre>', print_r($row, 1), '</pre>';

    }
    // while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    //     $qaotationID = $row['Qt_QaotationID'];

    //     // Check if the key for this $qaotationID exists in the array
    //     if (!isset($groupedData[$qaotationID])) {
    //         $groupedData[$qaotationID] = array();
    //     }

    //     // Add the current row to the array with the matching $qaotationID
    //     $groupedData[$qaotationID][] = $row;
    // }
    // echo '<pre>', print_r($groupedData, 1), '</pre>';

    // echo json_encode($data);

}
