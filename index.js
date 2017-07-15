const rover = require('./rover.js');

function test() {
}

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);

});
