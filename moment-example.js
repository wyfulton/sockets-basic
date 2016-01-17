// var moment = require('moment'),
// 	now = moment();

// // console.log(now.format());
// // console.log(now.format('X'));
// // console.log(now.format('x'));
// console.log(now.format('X'))
// var timestamp = now.valueOf('x');
// var timestampMoment = 1452808951

// console.log(timestampMoment.format('MMM Wo YYYY, h:mm a'))

// // now.subtract(1, 'year');
// // console.log(now.format());
// // console.log(now.format('MMM Wo YYYY, h:mma'));

// NEW

var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.valueOf());

var timestamp = 1444247486704;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a')); // 11:06 am

// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma')); // Oct 5th 2015, 6:45 pm