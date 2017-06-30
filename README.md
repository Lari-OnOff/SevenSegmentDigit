# SevenSegmentDigit.js
### Lightweight JavaScript library for creating vector seven-segment digits

Usage example:

``` JavaScript
var container = document.getElementById('digit-container');

// Parameters: parent element, digit height, segment thickness, width of slit between segments, digit value

var number = SevenSegmentDigit.create(container,293,27,5,0);
number.digit = 5; // set value "5" to digit
```

### Live Example

Simple digital clock created using *SevenSegmentDigit.js* can be found [here](http://larionov.site/demo/ssd).