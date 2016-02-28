<?php
    include_once('SportOut.php');

    use \SportOut\SportOut;
    $sportOut = new SportOut();
    $lastMatch = $sportOut->getLastMatch();
    $lastMatchClass = $lastMatch['isLive'] ? "live" : "past";
    $matchStart = date('U', strtotime($lastMatch['startTime']));
// Test
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/cyborg/bootstrap.min.css">
    <link rel="stylesheet" href="css/pickadate/default.css">
    <link rel="stylesheet" href="css/pickadate/default.date.css">
    <link rel="stylesheet" href="css/styles.min.css">

    <title>SportOut</title>
</head>
<body>
    <div class="main-container" touch-action="none">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#topNavBar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Riegler 15/16</a>
                </div>
                <div class="collapse navbar-collapse" id="topNavBar">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Matches <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">New / Current</a></li>
                                <li><a href="#">History</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Players <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Stats</a></li>
                                <li><a href="#">Payments / Attendance</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Payments <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Show</a></li>
                                <li><a href="#update-arrivals">Update</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="main-content">
            <div class="container-fluid content new-arrivals-container hidden"></div>
            <div class="container-fluid content live-match-container <?=$lastMatchClass?>">
                <div id="gameInfo">
                    <div id="startTime">
                        <div class="lead text-center">
                            <span class="label label-default"><small>7/2 21:30</small></span>
                        </div>
                        <div class="lead text-center blink">
                            <span class="label label-success" data-start-time="<?=$startTime?>"><small>7m</small></span>
                        </div>
                    </div>
                    <div id="finalScore" class="row">
                        <div id="leftScore" class="col-xs-6 text-center">
                            <div class="score-container">
                                <ul class="flip flip-md">
                                    <li>
                                        <a href="#">
                                            <div class="up">
                                                    <div class="shadow"></div>
                                                <div class="inn">1</div>
                                            </div>
                                            <div class="down">
                                                <div class="shadow"></div>
                                                <div class="inn">1</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <ul class="flip flip-md">
                                    <li>
                                        <a href="#">
                                            <div class="up">
                                                <div class="shadow"></div>
                                                <div class="inn">1</div>
                                            </div>
                                            <div class="down">
                                                <div class="shadow"></div>
                                                <div class="inn">1</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="rightScore" class="col-xs-6 text-center">
                            <ul class="flip flip-md">
                                <li>
                                    <a href="#">
                                        <div class="up">
                                            <div class="shadow"></div>
                                            <div class="inn">1</div>
                                        </div>
                                        <div class="down">
                                            <div class="shadow"></div>
                                            <div class="inn">1</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <ul class="flip flip-md">
                                <li>
                                    <a href="#">
                                        <div class="up">
                                            <div class="shadow"></div>
                                            <div class="inn">3</div>
                                        </div>
                                        <div class="down">
                                            <div class="shadow"></div>
                                            <div class="inn">3</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="boxScore" class="row">
                    <div id="leftTeam" class="col-md-6">
                        <div class="row team-name left-color">The Lefts</div>
                        <div class="row headers">
                            <div class="col-md-offset-4 col-md-1 col-xs-2 total text-center">Tot</div>
                            <div class="col-md-3 col-xs-4 2pt text-center">2pt M / A %</div>
                            <div class="col-md-3 col-xs-4 3pt text-center">3pt</div>
                            <div class="col-md-1 col-xs-2 fouls text-center">Fouls</div>
                        </div>
                        <div class="row player-row" data-player-name="Avi Vaisenberger" data-player-id="2">
                            <div class="col-md-4 player-name"><strong>Avi Vaisenberger</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt text-center"><span class="made">0</span> / <span class="attempted">0</span> <small><span class="percentage"></small></span></div>
                            <div class="col-md-3 col-xs-4 3pt text-center"><span class="made">3</span> / <span class="attempted">5</span> <small><span class="percentage">60%</span></small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Yoni Reshef</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Eitan Torf</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Maor Moshe</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Roy Sharf</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                    </div>
                    <div id="rightTeam" class="col-md-6">
                        <div class="row team-name right-color">The Rights</div>
                        <div class="row headers">
                            <div class="col-md-offset-4
                             col-md-1 col-xs-2 total text-center">Tot</div>
                            <div class="col-md-3 col-xs-4 2pt text-center">2pt M / A %</div>
                            <div class="col-md-3 col-xs-4 3pt text-center">3pt</div>
                            <div class="col-md-1 col-xs-2 fouls text-center">Fouls</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Roy Sharf</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Eitan Torf</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Maor Moshe</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Eitan Torf</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                        <div class="row player-row">
                            <div class="col-md-4 player-name"><strong>Maor Moshe</strong></div>
                            <div class="col-md-1 col-xs-2 total text-center">9</div>
                            <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                            <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small>60%</small></div>
                            <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay-loading-indicator hidden">
        <div id="cssload-contain">
            <div class="cssload-wrap" id="cssload-wrap1">
                <div class="cssload-ball" id="cssload-ball1"></div>
            </div>
            <div class="cssload-wrap" id="cssload-wrap2">
                <div class="cssload-ball" id="cssload-ball2"></div>
            </div>
            <div class="cssload-wrap" id="cssload-wrap3">
                <div class="cssload-ball" id="cssload-ball3"></div>
            </div>
            <div class="cssload-wrap" id="cssload-wrap4">
                <div class="cssload-ball" id="cssload-ball4"></div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.21/webfontloader.js"></script>
    <script src="js/playersController.js"></script>
    <script src="js/matchesController.js"></script>
    <script src="js/picker.js"></script>
    <script src="js/picker.date.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>
