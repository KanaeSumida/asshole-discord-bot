module.exports = {
    execute(str) {
        //  Remove any newline or carriage return
        str = str.replace(/\r?\n|\r/g, '');
        return str;
    }
}