<?php
$serverName = "119.59.96.90";
$connectionOptions = array(
    "Database" => "dwd_metallury",
    "Uid" => "dwdssa",
    "PWD" => "dwdP@ssw0rd2023",
    "ReturnDatesAsStrings" => true, // Optional
    "Encrypt" => 1, // Enables SSL
    "TrustServerCertificate" => 1, // Optional, set to 1 if you trust the certificate
    "CharacterSet" => "UTF-8",
);  



try {
    // $conn = new PDO("sqlsrv:Server=$serverName;Database={$connectionOptions['Database']}", $connectionOptions['Uid'], $connectionOptions['PWD']);
    $conn = sqlsrv_connect($serverName, $connectionOptions);

} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
