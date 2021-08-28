const updateClocks = require('../utils/clockupdater.js');


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('Ready!');

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
    },
};