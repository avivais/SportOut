SportOut = ( typeof SportOut !== 'undefined' ) ? SportOut : {
	toggleOverlay: function() {
		$( '.overlay-loading-indicator' ).toggleClass( 'hidden' );
		$( 'body' ).toggleClass( 'no-scroll' );
		$( '.main-container' ).toggleClass( 'blur' );
	}
};
$( document ).ready( function () {
	$( '.nav ul li a' ).click( function() {
		$( 'button.navbar-toggle' ).trigger( 'click' );
		$( '.content' ).hide();
		$( '#topNavBar .active' ).removeClass( 'active' );
		$closestLi = $( this ).closest( 'li' );
		while ($closestLi.length ) {
			$closestLi.addClass( 'active' );
			$closestLi = $closestLi.parent().closest( 'li' );
		}
		switch ( $( this ).attr( 'href' ) ) {
			case '#update-arrivals':
				showArrivals();
				break;
		}
	} );

	function updateArrivals( $selectedPlayers ) {
		var playersArr = [];
		$selectedPlayers.forEach( function( $playerData ) {
			playersArr.push( {
				'playerId': $playerData.data( 'player-id' ),
				'playerPayment': $playerData.find( 'input' ).val()
			} );
		} );
		$.ajax( {
			url: 'action.php',
			data: {
				action: 'updateArrivals',
				playersArr: playersArr
			}
		} );
	}

	function showArrivals() {
		SportOut.toggleOverlay();
		window.PlayersController.addToContainer( $( '.new-arrivals-container' ), 'newarrivals',
			function() {
				$( '.new-arrivals-container' ).removeClass( 'hidden' ).show();
				SportOut.toggleOverlay();
			},
			function( $selectedPlayers ) {
				updateArrivals( $selectedPlayers );
			}
		);
	}
} );
