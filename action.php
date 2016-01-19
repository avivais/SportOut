<?php

include_once 'SportOut.php';
include_once 'common.php';

use \SportOut\SportOut;

$sportOut = new SportOut();

$action = 'getPlayers';
switch ($_GET['action']) {
    case 'getPlayers':
        $type = common\getvar('type','all');
        $data = $sportOut->getPlayers($type);
        error_log(print_r($data,true));
        break;
    case 'updateArrivals':
        error_log(print_r($_GET,true));;
        $date = getvar('date');
        $data = $sportOut->updateArrivals(getvar('arrivals',array(),true));
        error_log($date." - ".print_r($data,true));
        break;
}

$data = json_encode($data);

if (array_key_exists('callback', $_GET)) {
    header('Content-Type: text/javascript; charset=utf8');

    $callback = $_GET['callback'];
    echo $callback.'('.$data.');';
} else {
    header('Content-Type: application/json; charset=utf8');
    echo $data;
}
