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

    public function getPlayers($type = 'all') {
        $baseSQL = 'SELECT `id` AS `Id`,`name` AS `Name` FROM `players`';
        $maxSelect = 15;
        switch ($type) {
            case 'all':
                $sql = $baseSQL;
                break;
            case 'newarrivals':
                $sql = $baseSQL;
                $maxSelect = $this->getMaxArrivals();
                break;
            case 'newmatch':
                $sql = $baseSQL . "
                    WHERE
                        `id` IN (
                            SELECT `playerId`
                            FROM `arrivals`
                            WHERE
                                `date` >= DATE_FORMAT(NOW() - INTERVAL 1 DAY, '%Y-%m-%d')
                        )
                ";
                //$lastMatchWinners = $this->getLastMatchWinners();
                break;
        }
        $players = array();
        $playersResult = $this->db->query($sql);
        while ($row = $playersResult->fetch_assoc()) {
            $players[] = $row;
        }
        return array("Players" => $players, "MaxSelect" => $maxSelect);
    }

    private function getMaxArrivals() {
        $sql = "
            SELECT (15-COUNT(*))
            FROM `arrivals`
            WHERE
                `date` >= DATE_FORMAT(NOW() - INTERVAL 1 DAY, '%Y-%m-%d')
        ";
        $row = $this->db->query($sql)->fetch_row();
        return ($row && isset($row[0])) ? $row[0] : 15;
    }

    public function updateArrivals($playersData) {
        foreach ($playersData as $data) {
            $sql = "
                INSERT INTO `arrivals` VALUES(
                    {$data["PlayerId"]},
                    DATE_FORMAT(NOW(), '%Y-%m=%d'),
                    {$data["Payment"]}
                )
            ";
            $this->db->query($sql);
        }
    }
    /*private function getLastMatchWinners() {
        $sql = "
            SELECT "
    }*/
}
