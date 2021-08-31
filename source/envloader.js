const dotenv = require('dotenv');

/**
 * Loads the appripriate environment variables based on the node environment.
 * @param {string} env - The current environment the process is running in. 
 *                       This should come directly from process.env.NODE_ENV
 */
module.exports = function(env) {
    if(env === 'production') {
        console.log('Loading production environment...');
        dotenv.config({ path: './.env.production' });
    } else if (env === 'development') {
        console.log('Loading development environment...');
        dotenv.config({ path: './.env.development' });
    } else {
        console.error(`Unknown env value: ${env}`);
    }
}


// module.exports = {
//     /**
//      * Loads the appripriate environment variables based on the node environment.
//      * @param {string} env - The current environment the process is running in. 
//      *                       This should come directly from process.env.NODE_ENV
//      */
//     load(env) { 
//         if(env === 'production') {
//             console.log('Loading production environment...');
//             dotenv.config({ path: './.env.production' });
//         } else if (env === 'development') {
//             console.log('Loading development environment...');
//             dotenv.config({ path: './.env.development' });
//         } else {
//             console.error(`Unknown env value: ${env}`);
//         }
//     }
// }