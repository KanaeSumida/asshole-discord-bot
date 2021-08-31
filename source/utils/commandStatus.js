'use strict';

module.exports = {
    /**
     * Simple enum that is used to define the status of commands when publishing them
     * to the Disocrd API.
     */
    commandStatus: {
        /**
         * This defines the command as enabled and will be published regardless of production
         * or development environment.
         */
        ENABLED: 'enabled',

        /**
         * This defines the command as enabled but will only publish if in development environment.
         */
        LOCALONLY: 'localonly',

        /**
         * This defines the command as diabled and will not be published regardless of production
         * or development environment.
         */
        DISABLED: 'disabled'
    },
};