const functions = require('firebase-functions');
const axios = require('axios')
const qs = require('qs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const moment = require('moment-timezone');
const cors = require('cors')({origin: true});

// [START trigger]
exports.mfu = functions.https.onRequest((req, res) => {
// [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    res.status(403).send('Forbidden!');
  }
  else if (req.method === 'POST') {
    console.log(typeof req.body)
    axios({
      method: 'post',
      url: 'http://archive.cmmakerclub.com/accept-post.php',
      data: qs.stringify(req.body)
    })
    .then(function (response) {
      console.log(response);
    })
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  cors(req, res, () => {
  // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // [START sendResponse] 
    const formattedDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
    const responseJson = { date: formattedDate, body: req.body }

    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(JSON.stringify(responseJson));
    // [END sendResponse]
  });
});
// [END all]
