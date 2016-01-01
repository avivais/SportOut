$( document ).ready( function () {
	//$( '#testPicker' ).pickadate( {} );
	$('body').on('player-list-selected', function() {
		$('iframe').remove();
	});
} );
