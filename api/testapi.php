<?php
include 'config.php';
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



// $query = "SELECT Pp_Planning_Date, Pp_ID, Pp_Sequence, Pp_CustomerID, Pp_ProductID, Pp_Products, Pp_Qty, Qt_Quantity, (IIF(Pp_Qty = Qt_Quantity, 'Y', 'N')) As i_Qty_Check, 
// Pp_Unit_Qty, Qt_Lenght_PUnit, Se_Longer, Cs_Customer, Pp_Reference, Pm_Kg_PMeter, Se_Qaotation, Pp_CoilNO, Qt_CoilNo, IIF(Qt_CoilNo = Pp_CoilNO, 'Y', 'N') As i_Coil_Check, 
// Pm_Symbol, Pm_Width, Pm_Width_Unit, Pp_Delivery_ID, Dm_Delivery_Medthod_TH, Dm_Delivery_Medthod_LA, Dm_Delivery_Medthod_EN, Pp_Planning_By, Us_UserName, Pp_Schedule_Date, 
// Pp_Product_Type, Pp_Taked_Date, Pp_Taked_By, Pp_Taked_Qty, Pp_Unit_Qty As i_Taked_Unit, Pp_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Pp_Sort, Pp_Status, Pp_Remark 
// FROM tbl_Production_Planning LEFT OUTER JOIN tbl_Customers ON Pp_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Delivery_Medthod ON Pp_Delivery_ID = Dm_ID 
// LEFT OUTER JOIN tbl_Sell ON Pp_Reference = Se_InvoiceNO AND Pp_Sequence = Se_Sequence LEFT OUTER JOIN tbl_Branch ON Pp_BranchID = Bn_ID 
// LEFT OUTER JOIN tbl_Users ON Pp_Planning_By = Us_ID LEFT OUTER JOIN tbl_Qaotation ON Qt_QaotationID = Se_Qaotation AND Pp_ProductID = Qt_ProductID AND Pp_Sequence = Qt_Sequence 
// LEFT OUTER JOIN tbl_Product_Master ON Pp_ProductID = Pm_ProductID LEFT OUTER JOIN tbl_Product_Movement_01 ON Pp_CoilNO = Pm_Coilno 
// WHERE  Pp_Products <> 'เงินมัดจำ' ORDER BY Pp_Planning_Date DESC, Pp_ID DESC";

$query = "SELECT CONVERT(DATE, Se_Date) As i_Date, Se_SellNo, SUBSTRING(Se_SellNo, 1, 2) As i_Doc, 'Sell' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Ss_Total As i_Total, IIF(Dp_DepositID IS NULL, Ss_Paid, 0) As Ss_Paid, IIF(Ss_Paid = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_SellNO = Ss_InvoiceNO AND Se_CustomerID = Ss_CustomerID LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
WHERE CONVERT(DATE, Se_Date) BETWEEN '$startDateFormat' AND '$endDateFormat'  AND Dp_DepositID IS NULL
GROUP BY Se_Date, Se_SellNo, SUBSTRING(Se_SellNo, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Ss_Total, Ss_Paid, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
UNION
SELECT CONVERT(DATE, Dp_Date) As i_Date, Dp_DepositID, SUBSTRING(Dp_DepositID, 1, 2) As i_Doc, 'Deposit' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Dp_Amount, 0 As i_Total, IIF(Dp_Amount = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_SellNO = Ss_InvoiceNO AND Se_CustomerID = Ss_CustomerID LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat'  AND Dp_DepositID IS NOT NULL
GROUP BY CONVERT(DATE, Dp_Date), Dp_DepositID, SUBSTRING(Dp_DepositID, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, Dp_Amount, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
UNION
SELECT CONVERT(DATE, Se_Invoice_Date) As i_Date, Se_InvoiceNO, SUBSTRING(Se_InvoiceNO, 1, 2) As i_Doc, 'Invoice' As i_Document, Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, 0 As i_Total, (Ss_Paid - Dp_Amount) As i_Amount, IIF(Dp_Amount = 0, '-', Ss_Payment_Medthod) AS i_Paid, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
FROM tbl_Sell LEFT OUTER JOIN tbl_Branch ON Se_BranchID = Bn_ID LEFT OUTER JOIN tbl_Customers ON Se_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Sell_Summary ON Se_SellNO = Ss_InvoiceNO AND Se_CustomerID = Ss_CustomerID LEFT OUTER JOIN tbl_Deposit ON Se_SellNo = Dp_SellNo LEFT OUTER JOIN tbl_Delivery_Invoice ON Se_SellNo = Di_InvoiceID
WHERE Se_Date BETWEEN '$startDateFormat' AND '$endDateFormat'  AND Dp_DepositID IS NOT NULL
GROUP BY CONVERT(DATE, Se_Invoice_Date), Se_InvoiceNO, SUBSTRING(Se_InvoiceNO, 1, 2), Se_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Cs_Customer, Ss_Grand_Total, (Ss_Paid - Dp_Amount), Dp_Amount, Ss_Payment_Medthod, Ss_Remaining, Dp_DepositID, Di_Delivery_ID,Ss_Discount
ORDER BY i_Date";

$query = "SELECT * FROM tbl_Sell_Summary LEFT OUTER JOIN tbl_Sell ON  Se_SellNo = Ss_InvoiceNO WHERE Ss_Date = '2023-11-12' AND Se_BranchID = 'TS'";

$query = "SELECT *,Se_BranchID,Se_Delivery_ID,Se_InvoiceNO,Se_SellNo, 
    CASE
        WHEN Dp_Amount > 0 THEN 'Deposit'
        ELSE 'Paid'
        END AS PaidType,
    CASE
        WHEN Dp_Amount > 0 THEN Ss_Paid - Dp_Amount
        ELSE Ss_Paid
    END AS Ss_Paid 
    FROM tbl_Sell_Summary LEFT OUTER JOIN tbl_Deposit ON Ss_InvoiceNO =  Dp_SellNo LEFT OUTER JOIN tbl_Sell ON Ss_InvoiceNO = Se_SellNo
    WHERE Ss_InvoiceNO = 'RITS2311-009'";
$InvoiceNO = 'RITS2311-008';
$query = "SELECT * FROM tbl_Sell_Summary WHERE Ss_InvoiceNO = '$InvoiceNO'";
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
} else {

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        echo '<pre>', print_r($row, 1), '</pre>';

    }
}

$query = "SELECT * FROM tbl_Sell WHERE Se_InvoiceNO = '$InvoiceNO'";
$result = sqlsrv_query($conn, $query);

if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
} else {

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        echo '<pre>', print_r($row, 1), '</pre>';

    }
}

$query = "SELECT * FROM tbl_Delivery_Invoice WHERE Di_InvoiceID = '$InvoiceNO'";
$result = sqlsrv_query($conn, $query);
$Di_Delivery_ID = '';
if ($result === false) {
    die(print_r(sqlsrv_errors(), true));
} else {

    while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        echo '<pre>', print_r($row, 1), '</pre>';
        $Di_Delivery_ID = $row['Di_Delivery_ID'];

    }
}

$query = "SELECT * FROM tbl_Deposit WHERE Dp_SellNo = '$Di_Delivery_ID' OR Dp_SellNo = '$InvoiceNO'";





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
    //     $qaotationID = $row['Pp_ID'];

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
