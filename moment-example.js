var moment = require('moment'),
	now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
console.log(now.format('X'))
var timestamp = now.valueOf('x');
var timestampMoment = 1452808951

console.log(timestampMoment.format('MMM Wo YYYY, h:mm a'))

// now.subtract(1, 'year');
// console.log(now.format());
// console.log(now.format('MMM Wo YYYY, h:mma'));
