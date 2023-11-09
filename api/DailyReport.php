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
    // $startDate = "01/10/2023";
    // $endDate = "14/10/2023";

}

//dd($dateArray);


//dd($endDate);
$data = [];

// แปรงค่าสตริงเป็นวันที่ในรูปแบบ Y-m-d
$startDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $startDate)));
$endDateFormat = date('Y-m-d', strtotime(str_replace('/', '-', $endDate)));


// $query = "SELECT Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_DepositID, Dp_Amount, (Ss_Paid - Dp_Amount) As i_Remain, Ss_InvoiceNO, Ss_Paid, Ss_Discount, Ss_Total,Ss_Grand_Total, Ss_Remaining, Se_Invoice_Date, Se_InvoiceNO, Ss_Payment_Medthod, Di_Date, Di_Delivery_ID, Ss_Bank 
// FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID
// LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID
// LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO
// LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo
// LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
// WHERE Se_Invoice_Date BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND (Ss_Paid + Dp_Amount) > 0
// GROUP BY Se_Date, Se_SellNo, Se_BranchID, Se_CustomerID, Cs_Customer, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Dp_DepositID, Dp_Amount, (Ss_Paid - Dp_Amount), Ss_Paid, Ss_InvoiceNO, Ss_Discount, Ss_Total,Ss_Grand_Total, Ss_Remaining, Se_Invoice_Date, Se_InvoiceNO, Ss_Payment_Medthod, Di_Date, Di_Delivery_ID, Ss_Bank
// ORDER BY Se_Invoice_Date";

$query = "SELECT CONVERT(DATE, Se_Date) As i_Date, Se_SellNo, SUBSTRING(Se_SellNo, 1, 2) As i_Doc, 'Sell' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Ss_Total As i_Total, IIF(Dp_DepositID IS NULL, Ss_Paid, 0) As Ss_Paid, IIF(Ss_Paid = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
WHERE CONVERT(DATE, Se_Date) BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND Dp_DepositID IS NULL
GROUP BY Se_Date, Se_SellNo, SUBSTRING(Se_SellNo, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Ss_Total, Ss_Paid, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
UNION
SELECT CONVERT(DATE, Dp_Date) As i_Date, Dp_DepositID, SUBSTRING(Dp_DepositID, 1, 2) As i_Doc, 'Deposit' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Dp_Amount, 0 As i_Total, IIF(Dp_Amount = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID 
WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND Dp_DepositID IS NOT NULL
GROUP BY CONVERT(DATE, Dp_Date), Dp_DepositID, SUBSTRING(Dp_DepositID, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Dp_Amount, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
UNION
SELECT CONVERT(DATE, Se_Invoice_Date) As i_Date, Se_InvoiceNO, SUBSTRING(Se_InvoiceNO, 1, 2) As i_Doc, 'Invoice' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, 0 As i_Total, (Ss_Paid - Dp_Amount) As i_Amount, IIF(Dp_Amount = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_InvoiceNO = Ss_InvoiceNO LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID 
WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat' AND Se_BranchID <> 'TS' AND Dp_DepositID IS NOT NULL
GROUP BY CONVERT(DATE, Se_Invoice_Date), Se_InvoiceNO, SUBSTRING(Se_InvoiceNO, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, (Ss_Paid - Dp_Amount), Dp_Amount, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID
ORDER BY i_Date";

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



