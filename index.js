
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

// Define a route for /api/:date?
app.get('/api/:date?', (req, res) => {
  // Get the date parameter from request URL
  const { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Attempt to parse the date parameter
  let parsedDate;
  if (!isNaN(date)) {
    // If date is a number, parse it as Unix timestamp in milliseconds
    parsedDate = new Date(parseInt(date));
  } else {
    // Otherwise, parse it as a date string
    parsedDate = new Date(date);
  }

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Get the Unix timestamp in milliseconds
  const unixTimestamp = parsedDate.getTime();

  // Get the UTC formatted date string
  const utcDate = parsedDate.toUTCString();

  // Return JSON response with Unix timestamp and UTC date
  res.json({ unix: unixTimestamp, utc: utcDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

