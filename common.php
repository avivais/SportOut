<?php

namespace common;

function getvar($var, $default = null, $jsonDecode = false) {
    return isset($_GET[$var]) ? ($jsonDecode ? json_decode($_GET[$var]) : $_GET[$var]) : $default;
}
