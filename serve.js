var port = 3000;
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/**", function(req, res){ //root dir
    res.sendFile('public/index.html', {root: __dirname });
});

app.listen(port);
console.log("Serving on http://localhost:3000");
