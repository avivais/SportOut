if ( !window.PlayersController ) {
    window.PlayersController = {
        selected: {},
        getData: function ( type, successCallback, errorCallback ) {
            $.ajax( {
                url: 'getPlayers.php',
                data: {
                    type: type
                }
            } ).then( successCallback, errorCallback );
        },
        addOverlay: function( $selectedPlayers, selectedData, okCallback, cancelCallback ) {
            $( 'body .overlay-container' ).remove();
            $( 'body' ).addClass( 'no-scroll' );
            $( '.main-container' ).addClass( 'blur' );
            $selectedPlayersContainer = $( '<div class="selected-players">' );
            if ( $selectedPlayers ) {
                $selectedPlayersContainer.append( $selectedPlayers );
            }
            $overlayContainer = $( 'body' ).append(
                $( '<div class="overlay-container single-action">' )
                .append(
                    $( '<div class="container-fluid selected-container">' )
                    .append( $selectedPlayersContainer ),
                    $( '<div class="container-fluid overlay-controls-container">' )
                    .append(
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-success ok">' )
                                .text( 'Ok' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger cancel">' )
                                .text( 'Cancel' )
                            )
                        )
                    )
                )
            );
            $overlayContainer.find( '.btn.ok' ).bind( 'click', function() {
                if ( okCallback ) {
                    okCallback.call( this, selectedData );
                }
                window.PlayersController.removeOverlay();
            } );
            $overlayContainer.find( '.btn.cancel' ).click( function () {
                if ( cancelCallback ) {
                    cancelCallback.call( this );
                }
                window.PlayersController.removeOverlay();
            } );
            return $overlayContainer;
        },
        removeOverlay: function( remove ) {
            $( '.overlay-container' ).hide();
            $( '.main-container' ).removeClass( 'blur' );
            $( 'body' ).removeClass( 'no-scroll' );
            $( '.overlay-container' ).remove();
        },
        addToContainer: function ( $container, type, okCallback, cancelCallback ) {
            var self = this;
            $playersListContainer = $( '<div class="container-fluid players-list-container">' ).append(
                $( '<div class="container-fluid players-list">' )
            );
            this.getData( type, function ( playersData ) {
                playersData.Players.forEach( function ( playerDetails ) {
                    $playersListContainer.find( '.players-list' ).append(
                        $( '<div class="row player-row">' )
                        .append(
                            $( '<div class="col-xs-12 player-data">' )
                            .text( playerDetails.Name )
                            .data( 'player-id', playerDetails.Id )
                        )
                    );
                } );
                $playersListContainer.find( '.player-row' ).click( function () {
                    var $this = $( this );
                    $playersListContainer = $this.closest( '.players-list-container' );
                    var maxSelect = playersData.MaxSelect;
                    $this.toggleClass( 'bg-primary selected' );
                    var selectedCount = $playersListContainer.find( '.selected' ).length;
                    if ( selectedCount > maxSelect ) {
                        $this.toggleClass( 'bg-primary selected' );
                        if ( !$this.hasClass( 'popover-active' ) ) {
                            $this.addClass( 'popover-active' );
                            var playerSuffix = maxSelect > 1 ? 's' : '';
                            $this.popover( {
                                container: 'body',
                                content: 'Can\'t select more than ' + maxSelect + ' player' + playerSuffix,
                                placement: $this.is( ':first-child' ) ? 'bottom' : 'top'
                            } );
                            $this.popover( 'show' );
                            setTimeout( function () {
                                $this.popover( 'destroy' );
                                $this.removeClass( 'popover-active' );
                            }, 800 );
                        }
                    } else if ( selectedCount == maxSelect ) {
                        var selectedData = {
                            'names': $( '.selected .player-data' ).map( function () {
                                return $( this ).text();
                            } ),
                            'ids': $( '.selected .player-data' ).map( function () {
                                return $( this ).data( 'player-id' );
                            } )
                        };
                        var $selectedElements = [];
                        selectedData.names.each( function() {
                            $selectedElements.push(
                                $( '<div class="row">')
                                .append(
                                    $( '<div class="col-xs-12 text-center">' ).text( this )
                                )
                            );
                        } );
                        self.addOverlay( $selectedElements, selectedData, okCallback, cancelCallback );
                    }
                } );
                $container.append( $playersListContainer );
            }, function ( error ) {} );
        }
    };
}
