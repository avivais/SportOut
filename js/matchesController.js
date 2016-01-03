if ( !window.MatchesController ) {
    window.MatchesController = {
        addOverlay: function() {
            $overlayContainer = $( 'body' ).append(
                $( '<div class="overlay-container multiple-actions">' )
                .append(
                    $( '<div class="container-fluid selected-container">' )
                    .append(
                        $( '<div class="selected-players">' )
                        .text( $( this ).data( 'playerName' ) )
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
                                $( '<button class="btn btn-lg btn-success 2pt-made">' )
                                .text( 'Made' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger 2pt-miss">' )
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
                                $( '<button class="btn btn-lg btn-success 3pt-made">' )
                                .text( 'Made' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger 3pt-miss">' )
                                .text( 'Miss' )
                            )
                        ),
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-12 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-warning foul">' )
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
            $overlayContainer.find( '.btn' ).click( function () {
                window.MatchesController.toggleOverlay( true );
            } );
            window.MatchesController.toggleOverlay();
            return $overlayContainer;
        },
        toggleOverlay: function( remove ) {
            $( 'body' ).toggleClass( 'no-scroll' );
            $( '.main-container' ).toggleClass( 'blur' );
            $( '.overlay-container' ).toggle();
            if ( remove ) {
                $( '.overlay-container' ).remove();
            }
        }
    };
    $( document ).ready( function () {
        $( '.live-match-container .player-row' ).click( window.MatchesController.addOverlay );
    } );
}
