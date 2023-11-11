<?php
include 'config.php';
$query = "";
if(!empty($_POST['searchTerm'])){
    $searchTerm = $_POST['searchTerm'];
    $query = "SELECT St_ProductID, Pm_Description, St_Qty, Pm_Unit, Pp_Price, Pp_Cost_Price, (SELECT TOP 1 Mh_Datetime FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID) As i_Last_Movement, (SELECT TOP 1 Mh_UserID FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID) As i_Last_User, (SELECT Us_UserName FROM tbl_Users WHERE Us_ID = (SELECT TOP 1 Mh_UserID FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID)) As i_Last_Username, St_Product_Type, St_Minimum, St_Maximum, St_Location, St_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, St_Create_Date, St_Sort, St_Status, St_Remark 
            FROM tbl_Stock LEFT OUTER JOIN tbl_Product_Master ON St_ProductID = Pm_ProductID AND St_BranchID = St_BranchID LEFT OUTER JOIN tbl_Branch ON St_BranchID = Bn_ID LEFT OUTER JOIN tbl_Product_Price ON St_ProductID = Pp_ID AND St_BranchID = Pp_Branch 
            WHERE St_ProductID LIKE '%$searchTerm%' 
            OR Pm_Description LIKE '%$searchTerm%' 
            OR Pm_Unit LIKE '%$searchTerm%'
            OR St_BranchID LIKE '%$searchTerm%'
            OR Bn_Branch_TH LIKE '%$searchTerm%'
            OR Bn_Branch_LA LIKE '%$searchTerm%'
            OR Bn_Branch_EN LIKE '%$searchTerm%'
            OR St_Remark LIKE '%$searchTerm%'
            OR Pm_Description LIKE '%$searchTerm%'
            ORDER BY St_BranchID, Pm_Description";
}else {
    $query = "SELECT St_ProductID, Pm_Description, St_Qty, Pm_Unit, Pp_Price, Pp_Cost_Price,
    (SELECT TOP 1 Mh_Datetime FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID) As i_Last_Movement, 
    (SELECT TOP 1 Mh_UserID FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID) As i_Last_User, 
    (SELECT Us_StringID FROM tbl_Users WHERE Us_ID = (SELECT TOP 1 Mh_UserID FROM tbl_Movement_History WHERE Mh_Barcode = St_ProductID AND St_BranchID = Mh_BranchID)) As i_Last_Username,
    St_Product_Type, St_Minimum, St_Maximum, St_Location, St_BranchID, Bn_Branch_TH, Bn_Branch_LA, Bn_Branch_EN, St_Create_Date, St_Sort, St_Status, St_Remark 
    FROM tbl_Stock LEFT OUTER JOIN tbl_Product_Master ON St_ProductID = Pm_ProductID AND St_BranchID = St_BranchID LEFT OUTER JOIN tbl_Branch ON St_BranchID = Bn_ID 
    LEFT OUTER JOIN tbl_Product_Price ON St_ProductID = Pp_ID AND St_BranchID = Pp_Branch ORDER BY St_BranchID, Pm_Description";
}

//dd($dateArray);


//dd($endDate);
$data = [];

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



