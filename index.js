const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve your JSON data from db.json
const router = express.Router();
const dbPath = path.join(__dirname, 'db.json');
app.use('/api', router);
router.get('/stickers', (req, res) => {
  // Read and send JSON data from db.json here
  const stickers = require(dbPath).stickers;
  res.json(stickers);
});

// Serve your static images from the /images route
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
