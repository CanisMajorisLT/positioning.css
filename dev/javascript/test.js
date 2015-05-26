/**
 * Created by vyt on 2015-05-24.
 */
var x = [[1],2,3,4,5,6];


var p = 'lo=lol'

var z = x.reduce(function (prev, curr, index) {
    console.log(prev);
    var s = prev;
    s.push(index);
    console.log(s);
   return s
});
var dacookies = 'lol=1; ha=2; fk=you';

console.log(!null);