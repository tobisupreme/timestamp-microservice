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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// An empty date parameter should return with the current time
app.get('/api', function (req, res) {
  const date = new Date()
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
})

// a request with valid date parameter should return a JSON object with
// - key that is a Unix timestamp of the input date in milliseconds (as type Number)
// - key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
app.get('/api/:date', (req, res) => {
  let date = new Date(Number(req.params.date))

  if (date == 'Invalid Date') {
    date = new Date(req.params.date)
    if (date == 'Invalid Date') {
      return res.json({ error: 'Invalid Date' })
    }
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
