const router = require('express').Router();
const path = require('path');

// Defines the route that sends 'index.html' as a response to a client when a GET request is made
router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Defines the route that sends 'notes.html" as a response to a client when a GET request is made 
router.get('/notes', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;