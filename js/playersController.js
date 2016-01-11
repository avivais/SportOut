if ( !window.PlayersController ) {
    window.PlayersController = {
        selected: {},
        getData: function ( type, successCallback, errorCallback ) {
            $.ajax( {
                url: 'action.php',
                data: {
                    action: 'getPlayers',
                    type: type
                }
            } ).then( successCallback, errorCallback );
        },
        addOverlay: function ( $selectedPlayers, okCallback, cancelCallback, $container, refresh ) {
            $( 'body .overlay-container' ).remove();
            $( 'body' ).addClass( 'no-scroll' );
            $( '.main-container' ).addClass( 'blur' );
            $selectedPlayersContainer = $( '<div class="selected-players">' );
            if ( $selectedPlayers ) {
                $selectedPlayersContainer.append( $selectedPlayers );
                $selectedPlayersContainer.find( '.selected-player' ).click( function ( event ) {
                    var $paymentInputContainer = $( this ).find( '.payment-input-container' );
                    var $paymentInput = $paymentInputContainer.find( 'input' );
                    var $target = $( event.target );
                    if ( $target.hasClass( 'clear-button' ) ) {
                        // Clicked on clear button - Clear input
                        $paymentInput.val( '' );
                        return;
                    }
                    if ( $target.hasClass( 'payment-input' ) ) {
                        // Clicked on input - Do nothing
                        return;
                    }
                    var wasHidden = $paymentInputContainer.hasClass( 'hidden' );
                    $( '.selected-player .payment-input-container:not(.hidden)' ).each( function () {
                        $( this ).addClass( 'hidden' );
                        var updatedPayment = $( this ).find( '.payment-input' ).val() ? $( this ).find( '.payment-input' ).val() + " &#8362;" : "";
                        $( this ).siblings( '.payment' ).html( updatedPayment ).show();
                    } );
                    if ( wasHidden ) {
                        $paymentInputContainer.removeClass( 'hidden' );
                        var $paymentContainer = $( this ).find( '.payment' );
                        $paymentContainer.hide();
                        var payment = parseFloat( $paymentContainer.text() );
                        if ( payment ) {
                            $paymentInput.val( payment );
                        }
                        $paymentInput.focus();
                    }
                    else {
                        $paymentInputContainer.addClass( 'hidden' );
                        var updatedPayment = $paymentInput.val() ? $paymentInput.val() + " &#8362;" : "";
                        $paymentInputContainer.siblings( '.payment' ).html( updatedPayment ).show();
                    }
                } );
            }
            $overlayContainer = $( 'body' ).append(
                $( '<div class="overlay-container single-action">' ).append(
                    $( '<div class="container-fluid selected-container">' ).append( $selectedPlayersContainer ),
                    $( '<div class="container-fluid overlay-controls-container">' ).append(
                        $( '<div class="row buttons-container">' ).append(
                            $( '<div class="col-xs-6 text-center">' ).append(
                                $( '<button class="btn btn-lg btn-success ok">' )
                                .text( 'Ok' )
                            ),
                            $( '<div class="col-xs-6 text-center">' ).append(
                                $( '<button class="btn btn-lg btn-danger cancel">' )
                                .text( 'Cancel' )
                            )
                        )
                    )
                )
            );
            $overlayContainer.find( '.btn.ok' ).bind( 'click', function () {
                if ( okCallback ) {
                    okCallback.call( this, $selectedPlayers );
                }
                window.PlayersController.removeOverlay();
                if ( $container && refresh ) {
                    $container.refresh();
                }
            } );
            $overlayContainer.find( '.btn.cancel' ).click( function () {
                if ( cancelCallback ) {
                    cancelCallback.call( this );
                }
                window.PlayersController.removeOverlay();
                if ( $container && refresh ) {
                    $container.refresh();
                }
            } );
            return $overlayContainer;
        },
        addSelectedOverlay: function ( okCallback, cancelCallback, $container ) {
            var $selectedElements = [];
            $( '.selected .player-data' ).each( function () {
                var payment = $( this ).data( 'payment' ) ? $( this ).data( 'payment' ) + " &#8362;" : "";
                $selectedElements.push(
                    $( '<div class="row selected-player">' ).append(
                        $( '<div class="col-xs-12 text-center">' ).append(
                            $( '<div class="player-name">' ).text( $( this ).text() ),
                            $( '<div class="payment">' ).html( payment ),
                            $( '<div class="payment-input-container hidden">' ).append(
                                $( '<input class="payment-input" type="text">' ),
                                $( '<span class="glyphicon glyphicon-remove-circle clear-button">' )
                            )
                        )
                    )
                );
            } );
            this.addOverlay( $selectedElements, okCallback, cancelCallback, $container );
        },
        removeOverlay: function ( remove ) {
            $( '.overlay-container' ).hide();
            $( '.main-container' ).removeClass( 'blur' );
            $( 'body' ).removeClass( 'no-scroll' );
            $( '.overlay-container' ).remove();
        },
        addToContainer: function ( $container, type, doneCallback, okCallback, cancelCallback, minSelect ) {
            var self = this;
            $playersListContainer = $( '<div class="container-fluid players-list-container">' ).append(
                $( '<div class="container-fluid players-list">' )
            );
            this.getData( type, function ( playersData ) {
                playersData.Players.forEach( function ( playerDetails ) {
                    $playersListContainer.find( '.players-list' ).append(
                        $( '<div class="row player-row">' ).append(
                            $( '<div class="col-xs-12 player-data">' )
                            .append(
                                $( '<div class="player-name">' ).text( playerDetails.Name ),
                                $( '<div class="payment">' ).html( playerDetails.Payment )
                            )
                            .data( 'player-id', playerDetails.Id )
                            .data( 'payment', playerDetails.Payment )
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
                        self.addSelectedOverlay( okCallback, cancelCallback, $container );
                    } else {
                        if ( !minSelect ) {
                            minSelect = 1;
                        }
                        if ( selectedCount > minSelect ) {
                            $( '.hover-button-container' ).removeClass( 'hidden' );
                        } else {
                            $( '.hover-button-container' ).addClass( 'hidden' );
                        }
                    }
                } );
                $container.append( $playersListContainer,
                    $( '<div class="hover-button-container hidden">' ).append(
                        $( '<button class="btn btn-lg btn-success done">' )
                        .text( 'Done' )
                    )
                );
                $container.find( '.done' ).click( function () {
                    self.addSelectedOverlay.call( self, okCallback, cancelCallback, $container );
                } );
                $container.refresh = function () {
                    $container.find( '.players-list-container' ).remove();
                    window.PlayersController.addToContainer( $container, type, doneCallback, okCallback, cancelCallback );
                };
                if ( doneCallback ) {
                    doneCallback.call( this );
                }
            }, function ( error ) {} );
        }
    };
}
