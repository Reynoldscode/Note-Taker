const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Defines the get request to '/api/notes'
router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Defines the post request to '/api/notes'
router.post('/api/notes', (req, res) => {
  try {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    if (!newFeedback.title || !newFeedback.text) {
      return res.status(400).json({ error: "Title and text are required" });
    }
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.status(201).json(dbJson);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/api/notes/:id', (req, res) => {
  try {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
      return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;