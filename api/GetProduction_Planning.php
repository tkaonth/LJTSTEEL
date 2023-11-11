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
    $query = "SELECT Pp_Planning_Date, Pp_ID, Pp_Sequence, Pp_CustomerID, Pp_ProductID, Pp_Products, Pp_Qty, Qt_Quantity, (IIF(Pp_Qty = Qt_Quantity, 'Y', 'N')) As i_Qty_Check,
        Pp_Unit_Qty, Qt_Lenght_PUnit, Se_Longer, Cs_Customer, Pp_Reference, Pm_Kg_PMeter, Se_Qaotation, Pp_CoilNO, Qt_CoilNo, IIF(Qt_CoilNo = Pp_CoilNO, 'Y', 'N') As i_Coil_Check,
        Pm_Symbol, Pm_Width, Pm_Width_Unit, Pp_Delivery_ID, Dm_Delivery_Medthod_TH, Dm_Delivery_Medthod_LA, Dm_Delivery_Medthod_EN, Pp_Planning_By, Us_UserName, Pp_Schedule_Date,
        Pp_Product_Type, Pp_Taked_Date, Pp_Taked_By, Pp_Taked_Qty, Pp_Unit_Qty As i_Taked_Unit, Pp_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Pp_Sort, Pp_Status, Pp_Remark
        ,CONVERT(varchar(10),Pp_Planning_Date,105 ) AS C_Date ,CONVERT(varchar(10),Pp_Schedule_Date,105 ) AS C_Schedule_Date
        FROM tbl_Production_Planning LEFT OUTER JOIN tbl_Customers ON Pp_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Delivery_Medthod ON Pp_Delivery_ID = Dm_ID
        LEFT OUTER JOIN tbl_Sell ON Pp_Reference = Se_InvoiceNO AND Pp_Sequence = Se_Sequence LEFT OUTER JOIN tbl_Branch ON Pp_BranchID = Bn_ID
        LEFT OUTER JOIN tbl_Users ON Pp_Planning_By = Us_ID LEFT OUTER JOIN tbl_Qaotation ON Qt_QaotationID = Se_Qaotation AND Pp_ProductID = Qt_ProductID AND Pp_Sequence = Qt_Sequence
        LEFT OUTER JOIN tbl_Product_Master ON Pp_ProductID = Pm_ProductID LEFT OUTER JOIN tbl_Product_Movement_01 ON Pp_CoilNO = Pm_Coilno
        WHERE CONVERT(DATE,Pp_Planning_Date) BETWEEN '$startDateFormat' AND '$endDateFormat' AND Pp_Products <> 'เงินมัดจำ' ORDER BY Pp_Planning_Date DESC, Pp_ID DESC";
} else {
    $query = "SELECT Pp_Planning_Date, Pp_ID, Pp_Sequence, Pp_CustomerID, Pp_ProductID, Pp_Products, Pp_Qty, Qt_Quantity, (IIF(Pp_Qty = Qt_Quantity, 'Y', 'N')) As i_Qty_Check,
        Pp_Unit_Qty, Qt_Lenght_PUnit, Se_Longer, Cs_Customer, Pp_Reference, Pm_Kg_PMeter, Se_Qaotation, Pp_CoilNO, Qt_CoilNo, IIF(Qt_CoilNo = Pp_CoilNO, 'Y', 'N') As i_Coil_Check,
        Pm_Symbol, Pm_Width, Pm_Width_Unit, Pp_Delivery_ID, Dm_Delivery_Medthod_TH, Dm_Delivery_Medthod_LA, Dm_Delivery_Medthod_EN, Pp_Planning_By, Us_UserName, Pp_Schedule_Date,
        Pp_Product_Type, Pp_Taked_Date, Pp_Taked_By, Pp_Taked_Qty, Pp_Unit_Qty As i_Taked_Unit, Pp_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, Pp_Sort, Pp_Status, Pp_Remark
        ,CONVERT(varchar(10),Pp_Planning_Date,105 ) AS C_Date ,CONVERT(varchar(10),Pp_Schedule_Date,105 ) AS C_Schedule_Date
        FROM tbl_Production_Planning LEFT OUTER JOIN tbl_Customers ON Pp_CustomerID = Cs_ID LEFT OUTER JOIN tbl_Delivery_Medthod ON Pp_Delivery_ID = Dm_ID
        LEFT OUTER JOIN tbl_Sell ON Pp_Reference = Se_InvoiceNO AND Pp_Sequence = Se_Sequence LEFT OUTER JOIN tbl_Branch ON Pp_BranchID = Bn_ID
        LEFT OUTER JOIN tbl_Users ON Pp_Planning_By = Us_ID LEFT OUTER JOIN tbl_Qaotation ON Qt_QaotationID = Se_Qaotation AND Pp_ProductID = Qt_ProductID AND Pp_Sequence = Qt_Sequence
        LEFT OUTER JOIN tbl_Product_Master ON Pp_ProductID = Pm_ProductID LEFT OUTER JOIN tbl_Product_Movement_01 ON Pp_CoilNO = Pm_Coilno
        WHERE CONVERT(DATE,Pp_Planning_Date) BETWEEN '$startDateFormat' AND '$endDateFormat' AND Pp_Products <> 'เงินมัดจำ' ORDER BY Pp_Planning_Date DESC, Pp_ID DESC";


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
        $qaotationID = $row['Pp_ID'];

        // Check if the key for this $qaotationID exists in the array
        if (!isset($groupedData[$qaotationID])) {
            $groupedData[$qaotationID] = array();
        }

        // Add the current row to the array with the matching $qaotationID
        $groupedData[$qaotationID][] = $row;
    }
    echo json_encode($groupedData);



}
