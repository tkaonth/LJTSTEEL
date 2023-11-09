<?php
    session_start();
    if(!empty($_POST['locale'])){
        $_SESSION["locale"] = $_POST['locale'];
        echo "success";
    }else{
        echo "error";
    }
    
    
?>