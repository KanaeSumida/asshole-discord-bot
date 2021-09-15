const moment = require('moment-timezone');

const now = moment('2021-09-15T08:09:00Z').tz('America/Los_Angeles');

let clock = 'clock';
const hour = now.hour() % 12;
const minute = now.minute();

if (hour  === 0) {
    clock += '12'
} else {
    clock += `${hour}`;
}

if (minute >= 30) {
    clock += '30';
}


console.log(`Time ${now.format('hh:mma z')}`);
console.log(`Hours: ${now.hours()}`);
console.log(`Minutes ${now.minute()}`);
console.log(`Clock: ${clock}`);

