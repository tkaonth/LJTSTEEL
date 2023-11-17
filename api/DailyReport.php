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

$query = "SELECT Ss_CustomerID,Ss_InvoiceNo,Ss_Price,Ss_Vat,Ss_Total,Ss_Discount,Ss_Grand_Total,Ss_Paid,Ss_Remaining,Ss_Payment_Medthod,Se_Qaotation,
Bn_Branch_TH,Bn_Branch_LA,Bn_Branch_EN,Di_Delivery_ID,Cs_Customer,Dp_Date,Dp_DepositID,Dp_Amount,CONVERT(varchar(10),Ss_date,105 ) AS i_Date 
FROM tbl_Sell_Summary 
LEFT OUTER JOIN ( 
SELECT Se_InvoiceNo,Se_SellNo,Se_Qaotation,Se_BranchID,Se_UserId
FROM tbl_Sell
GROUP BY Se_InvoiceNo,Se_SellNo,Se_Qaotation,Se_BranchID,Se_UserId) AS tbl_Sell ON Ss_InvoiceNO = Se_SellNo 
LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN ( 
SELECT Di_Delivery_ID,Di_InvoiceID
FROM tbl_Delivery_Invoice
GROUP BY Di_Delivery_ID,Di_InvoiceID) AS tbl_Delivery_Invoice ON Se_InvoiceNO = Di_delivery_ID
LEFT OUTER JOIN tbl_Customers ON Ss_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Deposit ON Dp_SellNo = Se_InvoiceNO
WHERE CONVERT(DATE,Ss_date) BETWEEN '2023-11-17' AND '2023-11-17'";

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



