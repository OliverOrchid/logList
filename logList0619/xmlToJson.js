
var xml = "<root>Hello xml2js!</root>"

var parseString = require('xml2js').parseString;

parseString(xml, function (err, result) {
    console.log(result);
});