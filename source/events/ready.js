const updateClocks = require('../utils/clockupdater.js');


module.exports = {
    /**
     * The name of the event as called by discord.js
     */
    name: 'ready',

    /**
     *  Determines if this event is executed only once.
     */
    once: true,

    /**
     * Handles the execute of the 'interactionCreate' event
     * @param {Message} interaction 
     * @returns 
     */
    execute(client) {
        //  Output to console that the client is ready.
        console.log('Ready!');

        //  Only update the clock channels if we are in a production environment
        if (process.env.NODE_ENV === 'producation') {
            //  Immediatly update the clocks
            updateClocks.execute(client);

            //  Calculate when to update clocks again
            const minutesToWait = 30;

            let offset = new Date().getMinutes() % minutesToWait;
            offset = offset == 0 ? minutesToWait : minutesToWait - offset;

            setTimeout(() => {
                updateClocks.execute(client);
                setInterval(() => {
                    updateClocks.execute(client);
                }, 1800000)
            }, offset * 60000);
        }
    },
};