// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req,res) =>
  {
    const date = req.params.date;
    const Regex = /^[0-9]+$/;
    const numCheck = Regex.test(date);

    if(numCheck == false)
    {
      const unix = Date.parse(date)
      const utc = new Date(unix).toUTCString();

      unix
   ? res.json({ "unix": unix, "utc": utc })
   : res.json({ error: "Invalid Date" });
    }
    else
    {
      const unix = parseInt(date);
      const utc = new Date(unix).toUTCString();

      res.json({unix: unix, utc: utc})
    }
  })

app.get("/api/", (req,res) =>
  {
  let date = new Date();
  let UTC = date.getTime();
  UTC = new Date(UTC);
  UTS = UTC.toUTCString();
  let UNIX = date.getTime();
  res.json({ unix: UNIX, utc: UTS });
  })


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
