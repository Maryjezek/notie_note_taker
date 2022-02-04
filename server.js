const express = require("express");
const path = require("path");
const fs = require("fs");
const noteData = require("./db/db.json");
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static("public"));

// GET request for index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET request for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for db.json return all saved notes as JSON
app.get("/db/db.json", (req, res) => res.json(noteData));

//work on this POST request
// Post request to add note
app.post("/api/notes", (req, res) => {
  // Log our request to the terminal
  if (req.body && req.body.title && req.body.text) {
    console.info(`${req.method} request received to add note`);

    const { title, text } = req.body;

    // Log the request body
    console.info(req.body);

    const newNote = {
      title,
      text,
      review_id: uuid(),
    };
    console.log(newNote);

    //const Note = JSON.stringify(newNote);

    const jsonFile = "./db/db.json";
    let notes = JSON.parse(fs.readFileSync(jsonFile));
    notes.push(newNote);
    fs.writeFile(jsonFile, JSON.stringify(notes), (err) =>
      err
        ? console.error(err)
        : console.log(`New note:"${title}" has been written to JSON file`)
    );
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
