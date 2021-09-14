'use strict';

/**
 * Simple enum that defines the column datatypes avaialble for the
 * database.
 */
const datatypes = {
    /**
     * The value is a NULL value.
     */
    NULL = 'NULL',

    /**
     * The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes
     * depending on the magnitued of the value.
     */
    INTEGER = 'INTEGER',

    /**
     * The value is a floating point value, stored as an 8-byte IEEE
     * floating point number.
     */
    REAL = 'REAL',

    /**
     * The value is a text string, stored using the database encoding
     * (UTF-8, UTF-16BE, or UTF-16LE).
     */
    TExT = 'TEXT',

    /**
     * The value is a blob of data, stored exactly as it was input.
     */
    BLOB = 'BLOB'
}
module.exports = datatypes;