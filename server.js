const express = require("express");
const path = require("path");
const fs = require("fs");
const noteData = require("./db/db.json");
// Helper method for generating unique ids
const uuid = require("./helpers/uuid");
const { CONNREFUSED } = require("dns");
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
app.get("/api/notes", (req, res) => res.json(noteData));

// Post request to add note
app.post("/api/notes", (req, res) => {
  // Log our request to the terminal
  if (req.body && req.body.title && req.body.text) {
    console.info(`${req.method} request received to add note`);
    const { title, text, id } = req.body;
    // Log the request body
    console.info(req.body);
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    console.log(newNote);
    //const Note = JSON.stringify(newNote);
    const jsonFile = "./db/db.json";
    let notes = noteData || [];
    notes.push(newNote);
    fs.writeFile(jsonFile, JSON.stringify(notes), (err) =>
      err
        ? console.error(err)
        : console.log(`New note:"${title}" has been written to JSON file`)
    );
  }
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;

  fs.readFile("./db/db.json", (err, data) => {
    let notes = JSON.parse(data);
    let newNotes = notes.filter(note => {
      console.log(note.id, noteId)
      note.id != noteId
    })

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) =>
    err
      ? console.error(err)
      : console.log(`Removed note: ${noteId} has been removed from JSON file`)
  );
});
res.json(newNotes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
