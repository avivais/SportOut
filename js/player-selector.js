if ( !window.PlayersController ) {
    window.PlayersController = {
        getData: function ( type, successCallback, errorCallback ) {
            $.ajax( {
                url: 'getPlayers.php',
                data: {
                    type: type
                }
            } ).then( successCallback, errorCallback );
        },
        addToContainer: function ( $container, type, okCallback, cancelCallback ) {
            $playersListContainer = $( '<div class="container-fluid players-list-container">' )
                .append(
                    $( '<div class="container-fluid players-list">' ),
                    $( '<div class="overlay-container">' )
                    .append(
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
                $playersListContainer.find( '.btn-ok' ).click( function() {
                    selectedPlayers = [];
                    $playersListContainer.find( '.selected .player-data' ).each(function() {
                        selectedPlayers.push($(this).data('player-id'));
                    })
                    okCallback.call(this, selectedPlayers);
                } );
                $playersListContainer.find( '.btn-cancel' ).click( cancelCallback );
                $playersListContainer.find( '.player-row' ).click( function () {
                    var $this = $( this );
                    $container = $this.closest( '.players-list-container' );
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
                            }, 1000 );
                        }
                    } else if ( selectedCount == maxSelect ) {
                        $playersListContainer.find( '.overlay-container' ).toggle();
                        $playersListContainer.find( '.players-list' ).toggleClass( 'blur' );
                        $( 'body' ).toggleClass( 'no-scroll' );
                    }

                } )
                $container.append( $playersListContainer );
            }, function ( error ) {} );
        }
    };
}

function playerSelector( $container, type, successCallback, cancelCallback ) {
    var playersListData;
    if ( updateNeeded ) {}
    /*$('.players-list-container .row').click(function () {
        var $this = $(this);
        $container = $this.closest('.players-list-container');
        var maxSelect = parseInt($container.data('upto'));
        $this.toggleClass('bg-primary selected');
        var selectedCount = $container.find('.selected').length;
        if (selectedCount> maxSelect) {
            $this.toggleClass('bg-primary selected');
            if (!$this.hasClass('popover-active')) {
                $this.addClass('popover-active');
                var playerSuffix = maxSelect> 1 ? 's' : '';
                $this.popover({
                    container: 'body',
                    content: 'Can\'t select more than ' + maxSelect + ' player' + playerSuffix,
                    placement: $this.is(':first-child') ? 'bottom' : 'top'
                });
                $this.popover('show');
                setTimeout(function () {
                    $this.popover('destroy');
                    $this.removeClass('popover-active');
                }, 1000);
            }
        } else if (selectedCount == maxSelect) {
            $('.overlay-container').toggle();
            $('.players-list-container').toggleClass('blur');
            $('body').toggleClass('no-scroll');
        }
    });
    $('#ok').click(function () {
        parent.$('body').trigger('player-list-selected');
    });
    $('#cancel').click(function () {
        parent.$('body').trigger('player-list-cancelled');
    })*/
}

playerSelector( 1, 2, 3, 4 );
