<?php

include_once 'SportOut.php';

use \SportOut\SportOut;

$sportOut = new SportOut();
$sportOut->updatePlayerData($_GET['playerId'], $_GET['updateType']);
