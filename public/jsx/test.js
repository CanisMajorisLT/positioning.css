/**
 * Created by vyt on 2015-04-09.
 */

var parser = require('./inputParser.jsx');
var _ = require('lodash');
var Promise = require('promise');

var niceo = {'tep': 'lb grazus', 'as': 'ir tep sakau', 4: 'look at me', 'haha': '60px', 'as': 'jajaj'};
var l = [1, 'll'];
var s = '50px';
var z = '100 '
var old = niceo['haha'];
niceo['haha'] = '100px';
console.log(old);
console.log(niceo);
console.log(typeof l === 'object');
console.log(typeof s === 'string');


var lol = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(5)
    },3000)
});

Promise.all([lol, 3]).then(function (r) {
    console.log(r);
})

console.log(l.map(function (r) {

    if (r === 1) {
        return 1
    }
}));

console.log(niceo);