const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

// Serve images from a directory
const imageDirectory = path.join(__dirname, 'images');
app.use('/images', express.static(imageDirectory));

// Handle GET requests with the ibb.co URLs
app.get('/:ibbUrl', (req, res) => {
  // Extract the ibb.co URL from the request parameters
  const ibbUrl = req.params.ibbUrl;

  // Make a request to the ibb.co URL
  https.get(ibbUrl, (ibbResponse) => {
    if (ibbResponse.statusCode === 200) {
      // Assuming the ibb.co URL serves an image, set the appropriate content type
      res.set('Content-Type', 'image/jpeg');
      // Pipe the ibb.co response to the client's response
      ibbResponse.pipe(res);
    } else {
      // Handle error responses from ibb.co
      res.status(ibbResponse.statusCode).send('Error accessing the ibb.co URL');
    }
  });

  // Handle errors in making the ibb.co request
  https.on('error', (e) => {
    res.status(500).send('Error making the request to ibb.co');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
