const sqlite = require('sqlite3').verbose();

class Database {
    #_storage;
    constructor(storage) {
        this.#_storage = storage;
    }

    async open() {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database(this.#_storage, e => {
                reject(e);
            });
            resolve(db);
        });
    };
}