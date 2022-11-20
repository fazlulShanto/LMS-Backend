const pd = `1999-02-01T13:21:56.020Z`;
const moment = require('moment');
console.clear();


console.log(moment(pd).format())
console.log(new Date(pd).getDate())
console.log(moment(pd,'YYYY-MM-DD'))