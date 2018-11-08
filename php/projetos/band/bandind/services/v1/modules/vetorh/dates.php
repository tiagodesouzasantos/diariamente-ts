<?php
$datetime1 = strtotime('2018-08-10');
$datetime2 = strtotime(date('Y-m-d'));

var_dump($datetime1);
var_dump($datetime2);
if($datetime1>$datetime2){
    echo 'oi';
}else{
    echo 'não';
}
?>