/*
 * @page nextcard Nextcard
 * @tag home
 *
 * ###Nextcard
 *  
 * Nextcard har ett antal klasser:
 *  
 * * Customer 
 * * Order 
 */
steal.plugins(	
	'jquery/controller',			// a widget factory
	'jquery/controller/subscribe',	// subscribe to OpenAjax.hub
	'jquery/view/ejs',				// client side templates
	'jquery/controller/view',		// lookup views with the controller's name
	'jquery/model',					// Ajax wrappers
	'jquery/dom/fixture',			// simulated Ajax requests
	'jquery/dom/form_params')		// form data helper
	
	.css('nextcard')	// loads styles

	.resources('jquery-ui-1.8.10.custom.min', 'jquery.hotkeys')					// 3rd party script's (like jQueryUI), in resources folder

	.models('game', 'player', 'deck', 'card')						// loads files in models folder 

	.controllers('game')					// loads files in controllers folder

	.views('//nextcard/gameOver.ejs', '//nextcard/init.ejs', '//nextcard/inputPlayers.ejs', 
			'//nextcard/playGame.ejs', '//nextcard/showCardsLeft.ejs', '//nextcard/showPlayers.ejs'); 	// adds views to be added to build