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

    if(req.params.date === '' || req.params.date === undefined) //handle empty dates
    {
      const unix = Date.parse(new Date())
      const utc = new Date(unix).toUTCString();

      console.log({unix: unix, utc: utc}) //check if right time is being logged in respect to system times (makes sure input time was not out of date).
      res.json({unix: unix, utc: utc})
   }
  else
  {
    if(numCheck == false) //handle dates that fail regex check
    {
      const unix = Date.parse(date)
      const utc = new Date(unix).toUTCString();

      unix
   ? res.json({ "unix": unix, "utc": utc })
   : res.json({ error: "Invalid Date" });
    }
    else //handle dates that pass regex check
    {
      const unix = parseInt(date);
      const utc = new Date(unix).toUTCString();

      res.json({unix: unix, utc: utc})
    }
  }
  })


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
