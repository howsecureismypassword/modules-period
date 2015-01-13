# How Secure Is My Password
## Periods

### Usage

```javascript
var period = require("period");

console.log(period(3600).getPeriod()); // { "value": 1, "name": "hour" }
console.log(period(24, "hour").getPeriod()); // { "value": 1, "name": "day" }
console.log(period(7, "day").getPeriod()); // { "value": 1, "name": "week" }
```