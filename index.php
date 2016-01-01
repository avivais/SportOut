<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/cyborg/bootstrap.min.css" rel="stylesheet" integrity="sha256-ZgJYmqb5jZ8WCDqIYHlUarCVI7NDkBCeFnMW1gfihwY= sha512-yK8VlGnQXDlAH4aaZwd0EfmkYwv/XwZaA7VcT9JDO1YeZSvzu94p7/btLABkerIR26o7uYIiEmY59gQv/w/itA==" crossorigin="anonymous">
    <link href='https://fonts.googleapis.com/css?family=Voltaire|Sigmar+One' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/pickadate/default.css">
    <link rel="stylesheet" href="css/pickadate/default.date.css">
    <link rel="stylesheet" href="css/styles.min.css">

    <title>SportOut</title>
</head>
<body>
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
                </ul>
            </div>
        </div>
    </nav>
    <div class="container-fluid game-container">
        <div id="gameInfo">
            <div id="startTime">
                <div class="lead text-center">
                    <span class="label label-default"><small>7/2 21:30</small></span>
                </div>
                <div class="lead text-center">
                    <span class="label label-success"><small>7m</small></span>
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
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Avi Vaisenberger</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Yoni Reshef</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Eitan Torf</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Maor Moshe</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Roy Sharf</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
            </div>
            <div id="rightTeam" class="col-md-6">
                <div class="row team-name right-color">The Rights</div>
                <div class="row player-row">
                    <div class="col-md-4 player-name"><strong>Roy Sharf</strong></div>
                    <div class="col-md-1 col-xs-2 total text-center">9</div>
                    <div class="col-md-3 col-xs-4 2pt-nom text-center">0 / 0</div>
                    <div class="col-md-3 col-xs-4 3pt-nom text-center">3 / 5 <small><strong>60%</strong></small></div>
                    <div class="col-md-1 col-xs-2 fouls text-center">3</div>
                </div>
            </div>
        </div>
    </div>

    <div>Test picker</div>
    <div>
        <input id="testPicker">
    </div>
    <div>
        <iframe src="iframe.html"></iframe>
    </div>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="js/picker.js"></script>
    <script src="js/picker.date.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>