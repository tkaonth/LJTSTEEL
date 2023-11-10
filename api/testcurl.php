<?php
$params = http_build_query(array(
    "access_key" => "2baad01980c8472a9639f7a3c63391df",
    "url" => "http: //www.ljtfinance.com/testview",
));

$image_data = file_get_contents("https://api.apiflash.com/v1/urltoimage?" . $params);
file_put_contents("screenshot.jpeg", $image_data);

