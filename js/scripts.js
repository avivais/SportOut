$( document ).ready( function () {
	$( '.nav ul li a' ).click( function() {
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
	function showArrivals() {
		window.PlayersController.addToContainer( $( '.new-arrivals-container' ), 'newarrivals',
			function() {
				$( '.new-arrivals-container' ).removeClass( 'hidden' ).show();
				debugger;
			},
			function(){
				debugger;
			}
		);
	}
} );
