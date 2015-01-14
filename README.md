# How Secure Is My Password
## Periods

```javascript
var period = require("period");

console.log(period(3600).getLength()); // 1
console.log(period(3600).getSingular()); // "hour"
console.log(period(3600).getPlural()); // "hours"

console.log(period(24, "hour").getLength()); // 1
console.log(period(24, "hour").getSingular()); // "day"

console.log(period(7, "day").getLength()); // 1
console.log(period(7, "day").getPlural()); // "weeks"
```