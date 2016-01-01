<?php

$names = array(
    'Avi Vaisenberger',
    'Roy Sharf',
    'Eitan Torf',
    'Yoni Reshef',
    'Adi Lieberman',
    'Ran Leibovitz',
    'Yakir Sadeh',
);

$arr = array();
$i = 0;
foreach ($names as $name) {
    $arr[] = array("Id" => ++$i, "Name" => $name);
}

$data = json_encode(array("Players" => $arr, "MaxSelect" => 2));

if (array_key_exists('callback', $_GET)) {
    header('Content-Type: text/javascript; charset=utf8');

    $callback = $_GET['callback'];
    echo $callback.'('.$data.');';
} else {
    header('Content-Type: application/json; charset=utf8');
    echo $data;
}
