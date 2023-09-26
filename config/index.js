const configDev = require('./config.dev.json');
const configProd = require('./config.pro.json');

const config = process.env.NODE_ENV === 'development' ? configDev : configProd;
module.exports = config;
