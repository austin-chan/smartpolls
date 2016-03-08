var port = 3000;
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/public"));

app.get("/**", function(req, res) {
    res.sendFile('dev.html', {root: __dirname });
});

app.listen(port);
console.log("Serving on http://localhost:3000");
