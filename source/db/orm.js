const sqlite = require('sqlite3').verbose();

/**
 * A simple database class that allows opening and closing 
 * the connection to a sqlite database.
 */
class Database {
    /**
     * The file path to the sqlite db storage file.
     */
    #_storage;

    /**
     * A reference to the sqlite database object.
     */
    #_db;

    /**
     * Creates a new Database object.
     * @param {String} storage - The file path to the sqlite storage file.
     */
    constructor(storage) {
        this.#_storage = storage;
    }

     /**
     * Opens a connection to the database.
     * @returns 
     */
      async open() {
        return new Promise((resolve, reject) => {
            let e;
            this.#_db = new sqlite.Database(this.#_storage, err => e = err);
            if (e) {
                reject(e);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Closes the connection to the database.
     * @returns 
     */
    async close() {
        return new Promise((resolve, reject) => {
            let e;
            this.#_db.close(err => e = err);
            if (e) {
                reject(e);
            } else {
                resolve(this);
            }
        });
    }


}

class ORM {
    /**
     * The file path to the sqlite db storage file.
     */
    #_storage;

    /**
     * Reference to the sqlite Database instance.
     */
    #_db;

    /**
     * The models that represent the database tables.
     */
    #_models;

    constructor(storage) {
        this._storage = storage;
    }

    /**
     * Opens a connection to the database.
     * @returns 
     */
    async open() {
        return new Promise((resolve, reject) => {
            let e;
            this._db = new sqlite.Database(this._storage, err => e = err);
            if (e) {
                reject(e);
            } else {
                resolve(this);
            }
        });
    }

    /**
     * Closes the connection to the database.
     * @returns 
     */
    async close() {
        return new Promise((resolve, reject) => {
            let e;
            this._db.close(err => e = err);
            if (e) {
                reject(e);
            } else {
                resolve(this);
            }
        });
    }

    async addModel(model) {

    }
}

module.exports = ORM;