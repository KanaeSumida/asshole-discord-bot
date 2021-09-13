'use strict';
/**
 * Simple enum that is used ot define the status of commands when publishing them
 * to the Discord API.  Avaliable properties are
 * * ENABLED
 * * LOCALONLY
 * * DISABLED
 */
const status = {
    /**
     * This defines the command as enabled and will be published regoardless of production or
     * development environment.
     */
    ENABLED: 'enabled',

    /**
     * This defines the command as enabled but will only publish fi in development environment.
     */
    LOCALONLY: 'localonly',

    /**
     * This defines the command as diabled and will not be published regardless of production
     * or development environment
     */
    DISABLED: 'disabled',
};

module.exports = status;
