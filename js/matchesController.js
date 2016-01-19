if ( !window.MatchesController ) {
    window.MatchesController = {
        addOverlay: function ( playerName ) {
            $overlayContainer = $( 'body' ).append(
                $( '<div class="overlay-container multiple-actions">' )
                .append(
                    $( '<div class="container-fluid selected-container">' )
                    .append(
                        $( '<div class="selected-players">' )
                        .text( playerName )
                    ),
                    $( '<div class="container-fluid overlay-controls-container">' )
                    .append(
                        $( '<div class="row buttons-header">' ).append(
                            $( '<div class="col-xs-12 text-center">' )
                            .text( '2pt' )
                        ),
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-success 2pt-made" data-type="2made">' )
                                .text( 'Made' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger 2pt-miss" data-type="2miss">' )
                                .text( 'Miss' )
                            )
                        ),
                        $( '<div class="row buttons-header">' )
                        .append(
                            $( '<div class="col-xs-12 text-center">' )
                            .text( '3pt' )
                        ),
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-success 3pt-made" data-type="3made">' )
                                .text( 'Made' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger 3pt-miss" data-type="3miss">' )
                                .text( 'Miss' )
                            )
                        ),
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-12 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-warning foul" data-type="foul">' )
                                .text( 'Foul' )
                            )
                        ),
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-12 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger cancel">' )
                                .text( 'Cancel' )
                            )
                        )
                    )
                )
            );
            window.MatchesController.toggleOverlay();
            return $overlayContainer;
        },
        toggleOverlay: function ( remove ) {
            $( 'body' ).toggleClass( 'no-scroll' );
            $( '.main-container' ).toggleClass( 'blur' );
            $( '.overlay-container' ).toggle();
            if ( remove ) {
                $( '.overlay-container' ).remove();
            }
        },
        playerSelected: function () {debugger;
            var playerId = $( this ).data( 'playerId' );
            var playerName = $( this ).data( 'playerName' );
            $overlayContainer = window.MatchesController.addOverlay();
            $overlayContainer.find( '.btn' ).bind( 'click', {
                playerId: playerId,
                playerName: playerName
            }, function ( event ) {
                window.MatchesController.updatePlayerData( $( this ).data( 'type' ), event.data.playerId );
                window.MatchesController.toggleOverlay( true );
            } );
        },
        updatePlayerData: function ( updateType, playerId ) {
            var total, attempted, made, percentage;
            switch ( updateType ) {
            case "2made":
                total = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .total' ).text() ) + 2;
                attempted = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .attempted' ).text() ) + 1;
                made = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .made' ).text() ) + 1;
                percentage = Math.round( made / attempted * 100 );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .total' ).text( total );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .attempted' ).text( attempted );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .made' ).text( made );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .percentage' ).text( percentage + '%' );
                break;
            case "2miss":
                attempted = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .attempted' ).text() ) + 1;
                made = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .made' ).text() );
                percentage = Math.round( made / attempted * 100 );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .attempted' ).text( attempted );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .2pt .percentage' ).text( percentage + '%' );
                break;
            case "3made":
                total = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .total' ).text() ) + 3;
                attempted = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .attempted' ).text() ) + 1;
                made = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .made' ).text() ) + 1;
                percentage = Math.round( made / attempted * 100 );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .total' ).text( total );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .attempted' ).text( attempted );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .made' ).text( made );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .percentage' ).text( percentage + '%' );
                break;
            case "3miss":
                attempted = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .attempted' ).text() ) + 1;
                made = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .made' ).text() );
                percentage = Math.round( made / attempted * 100 );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .attempted' ).text( attempted );
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .3pt .percentage' ).text( percentage + '%' );
                break;
            case "foul":
                fouls = parseInt( $( '.live-match-container .player-row[data-player-id=' + playerId + '] .fouls' ).text() ) + 1;
                $( '.live-match-container .player-row[data-player-id=' + playerId + '] .fouls' ).text( fouls );
                break;
            }
            $.ajax( {
                url: 'updatePlayerData.php',
                data: {
                    playerId: playerId,
                    updateType: updateType
                }
            } );
        }
    };

    $( document ).ready( function () {
        $( '.live-match-container .player-row' ).on( 'touchstart', window.MatchesController.playerSelected );
    } );
}
