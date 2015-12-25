$( document ).ready( function () {
	$( '#testPicker' ).pickadate( {} );
	$( '.players-list-container .row' ).click(function() {
		var $this = $( this );
		$container = $this.closest( '.players-list-container' );
		var maxSelect = parseInt( $container.data( 'upto' ) );
		$this.toggleClass( 'bg-primary selected' );
		if ( $container.find( '.selected' ).length > maxSelect ) {
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
				setTimeout( function() {
					$this.popover( 'destroy' );
					$this.removeClass( 'popover-active' );
				}, 1000 );
			}
		}
	} );
} );
