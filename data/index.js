/* globals __dirname */

const fs = require('fs');
const path = require('path');

module.exports = function(mongodb, models) {
    const data = {};

    fs.readdirSync('./data/')
        .filter((x) => x.includes('-data'))
        .forEach((file) => {
            const currentData = require(path.join(__dirname, file))(mongodb, models);

            Object.keys(currentData)
                .forEach((key) => {
                    data[key] = currentData[key];
                });
        });

    return data;
};