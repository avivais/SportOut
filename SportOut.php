<?php

namespace SportOut;

use mysqli;

class SportOut
{
    private $db;

    public function __construct()
    {
        $username = 'root';
        $password = 'avivr121';
        $hostname = 'test.sportout.tk';
        $dbName = 'sportout';
        // $username = 'sportsout';
        // $password = 'G0D@ddy1';
        // $hostname = 'sportsout.db.10456363.hostedresource.com';
        // $dbName = 'sportsout';
        $this->db = new mysqli('test.sportout.tk', 'root', 'avivr121', 'sportout');
        if (mysqli_connect_errno()) {
            die('Connection to DB failed: '.mysqli_connect_error());
        }
    }

    public function isLiveMatch()
    {
        $row = $this->db->query("SELECT `id` FROM `matches` WHERE endTime IS NOT NULL")->fetch_row();
        if ($row && $row[0]) {
            return $row[0];
        }

        return false;
    }

    public function getLastMatch()
    {
        $matchRow = $this->db->query("SELECT * FROM `matches` ORDER BY `id` DESC LIMIT 1")->fetch_assoc();
        $matchRow['isLive'] = !$matchRow['endTime'];
        return $matchRow;
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
