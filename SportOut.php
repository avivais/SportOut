<?php

namespace SportOut;

use mysqli;

class SportOut
{
    private $db;

    public function __construct()
    {
        $this->db = new mysqli('localhost', 'root', 'root', 'sportout');
        if (mysqli_connect_errno()) {
            die('Connection to DB failed: '.mysqli_connect_error());
        }
    }

    public function isLiveMatch()
    {
        $query = $this->db->query('SELECT `id` FROM `matches` WHERE endTime IS NOT NULL')->fetch_row();
        if ($query && $query[0]) {
            return $query[0];
        }

        return false;
    }

    public function updatePlayerData($playerId, $updateType)
    {
        if ($liveMatchId = $this->isLiveMatch() || true) {
            $sql = 'UPDATE `rosters` SET ';
            switch ($updateType) {
                case '2miss':
                    $sql .= '`2ptAttempted` = `2ptAttempted` + 1';
                    break;
                case '2made':
                    $sql .= '`2ptAttempted` = `2ptAttempted` + 1, `2ptMade` = `2ptMade` + 1';
                    break;
                case '3miss':
                    $sql .= '`3ptAttempted` = `3ptAttempted` + 1';
                    break;
                case '3made':
                    $sql .= '`3ptAttempted` = `3ptAttempted` + 1, `3ptMade` = `3ptMade` + 1';
                    break;
                case 'foul':
                    $sql .= '`fouls` = `fouls` + 1';
                    break;
            }
            $sql .= " WHERE `matchId` = {$liveMatchId} AND `playerId` = {$playerId}";
            error_log($sql);
        }
    }
}