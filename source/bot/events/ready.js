'use strict';

module.exports = {
    /**
     * The name of the event as called by discord.js
     */
    name: 'ready',

    /**
     * Determines if this event is executed only once.
     */
    once: true,

    execute() {
        //  Output to the console that the client is ready.
        console.log('Discord client ready');
    },
}