if ( !window.PlayersController ) {
    window.PlayersController = {
        selected: {},
        okCallback: null,
        cancelCallback: null,
        getData: function ( type, successCallback, errorCallback ) {
            $.ajax( {
                url: 'getPlayers.php',
                data: {
                    type: type
                }
            } ).then( successCallback, errorCallback );
        },
        addOverlay: function( show, addElements ) {
            $overlayContainer = $( 'body' ).append(
                $( '<div class="overlay-container">' )
                .append(
                    $( '<div class="container-fluid selected-container">' )
                    .append(
                        $( '<div class="selected-players">' )
                    ),
                    $( '<div class="container-fluid overlay-controls-container">' )
                    .append(
                        $( '<div class="row buttons-container">' )
                        .append(
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-success btn-ok">' )
                                .text( 'Ok' )
                            ),
                            $( '<div class="col-xs-6 text-center">' )
                            .append(
                                $( '<button class="btn btn-lg btn-danger btn-cancel">' )
                                .text( 'Cancel' )
                            )
                        )
                    )
                )
            );
            $overlayContainer.find( '.btn-ok' ).click( function () {
                window.PlayersController.toggleOverlay( true );
                window.PlayersController.okCallback.call( this, window.PlayersController.selected.ids );
            } );
            $overlayContainer.find( '.btn-cancel' ).click( function () {
                window.PlayersController.toggleOverlay( true );
                window.PlayersController.cancelCallback.call( this );
            } );
            if ( show ) {
                if ( addElements ) {
                    $overlayContainer.find( '.selected-players' ).append( addElements );
                }
                window.PlayersController.toggleOverlay();
            }
            return $overlayContainer;
        },
        toggleOverlay: function( remove ) {
            $( '.overlay-container' ).toggle();
            $( '.main-container' ).toggleClass( 'blur blur-transition' );
            $( 'body' ).toggleClass( 'no-scroll' );
            if ( remove ) {
                $( '.overlay-container' ).remove();
            }
        },
        addToContainer: function ( $container, type, okCallback, cancelCallback ) {
            var self = this;
            this.okCallback = okCallback;
            this.cancelCallback = cancelCallback;
            $playersListContainer = $( '<div class="container-fluid players-list-container">' ).append(
                $( '<div class="container-fluid players-list">' )
            );
            $overlayContainer = this.addOverlay();
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
                        self.selected = {
                            'names': $( '.selected .player-data' ).map( function () {
                                return $( this ).text();
                            } ),
                            'ids': $( '.selected .player-data' ).map( function () {
                                return $( this ).data( 'player-id' );
                            } )
                        };
                        var selectedElements = [];
                        self.selected.names.each( function() {
                            selectedElements.push(
                                $( '<div class="row">')
                                .append(
                                    $( '<div class="col-xs-12 text-center">' ).text( this )
                                )
                            );
                        } );
                        self.addOverlay( true, selectedElements );
                    }
                } );
                $container.append( $playersListContainer );
            }, function ( error ) {} );
        }
    };
}
