'use strict';

module.exports = {
    /**
     * Given a String, removes all new line (\n) and carraige return (\r)
     * symbols and returns it back.
     * @param {String} str 
     * @returns A String
     */
    removeNewLines(str) {
        return str.replace(/\r?\n|\r/g, '');
    },

    /**
     * Given a sring that contains quoted arguments, parses each seperate
     * argument into an array and returns the array.
     * @param {String} str 
     * @returns An Array of all arguments parsed from the given String.
     */
    parseQuotes(str = '') {
        //  Used to track the current string being built.
        let current = '';

        //  Array that contains all the strings that are built.
        const arr = [];

        //  Boolean that represents if we are currently inside a quoted string.
        let inQuotes = false;

        for (const char of str.trim()) {
            if (char === '"') {
                //  Current character is a " quote, so we flip the inQuotes flag.
                inQuotes = !inQuotes;
            } else if (char === ' ' && !inQuotes) {
                //  Current character is a space and we are not inside quotes
                //  so this means the string is built, and we push it to the
                //  array.
                arr.push(current);
                current = '';
            } else {
                //  Otherwise add the character to the current string.
                current += char;
            }
        }

        //  Push the last string being built.
        arr.push(current);

        //  Return the array result.
        return arr;
    }
}