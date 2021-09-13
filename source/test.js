const envLoader = require('./envloader');

envLoader.load(process.env.NODE_ENV);
console.log(process.env.TOKEN);