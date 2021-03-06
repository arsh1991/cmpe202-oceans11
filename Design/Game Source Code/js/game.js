/**
 * main
 */
var game = {

    /**
     * object where to store game global data
     */
    data : {
        score : 0,
    	time : '',
        health: 10,
        speed:{xvel:8, yvel:15},
        curranimation: 'run',
        print : []
    },

    /**
     *
     * Initialize the application
     */
    onload: function() {
        
        // init the video
        if (!me.video.init(800, 600, {wrapper : "screen", scale : "auto", scaleMethod : "flex-width", renderer : me.video.AUTO, subPixel : false })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
   
        // initialize the "sound engine"
        me.audio.init("mp3,ogg");

        // set all ressources to be loaded
        me.loader.preload(game.resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function ()    {
       
        var commands = [];

        // set the "Play/Ingame" Screen Object
        commands.push(new Command("set", me.state.MENU, new game.TitleScreen()))

        // set the "Play/Ingame" Screen Object
        commands.push(new Command("set", me.state.PLAY, new game.PlayScreen()));

        // set the fade transition effect
        me.state.transition("fade","#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("SlimeEntity", game.SlimeEnemyEntity);
        me.pool.register("FlyEntity", game.FlyEnemyEntity);
        me.pool.register("CoinEntity", game.CoinEntity);
	    me.pool.register("EndEntity", game.EndEntity);
        me.pool.register("ChickenEntity", game.ChickenEntity);


        // load the texture atlas file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
           me.loader.getJSON("texture"),
           me.loader.getImage("texture")
        );

        // add some keyboard shortcuts
        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode /*, edge */) {

            // change global volume setting
            if (keyCode === me.input.KEY.PLUS) {
                // increase volume
                me.audio.setVolume(me.audio.getVolume()+0.1);
            } else if (keyCode === me.input.KEY.MINUS) {
                // decrease volume
                me.audio.setVolume(me.audio.getVolume()-0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

         // display the menu title
        commands.push(new Command("change", me.state.MENU, null));
        
        for (var i = 0; i < commands.length; i++) {
            commands[i].execute();
        }
    }
};
