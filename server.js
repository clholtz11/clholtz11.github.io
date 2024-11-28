const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Parses JSON data sent by the client

// Serve static files from the current directory
app.use(express.static(__dirname));

// Endpoint to save the entry
app.post('/save-entry', (req, res) => {
    const newEntry = req.body.entry;
    if (newEntry) {
        // Append the entry to a file called "entries.txt"
        fs.appendFile('entries.txt', newEntry + '\n', (err) => {
            if (err) {
                res.status(500).send('Failed to save entry.');
            } else {
                res.send('Entry saved successfully!');
            }
        });
    } else {
        res.status(400).send('Invalid entry.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
