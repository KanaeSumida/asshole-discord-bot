const dotenv = require('dotenv');

module.exports = {
    /**
     * Loads the appripriate environment variables based on the node environment.
     * @param {string} env - The current environment the process is running in. 
     *                       This should come directly from process.env.NODE_ENV
     */
    load(env = 'development') {
        const envFile = `./.env.${env}`;
        console.log(`Loading ${env} environment from ${envFile}`);
        dotenv.config({ path: envFile });
    },
}