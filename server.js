const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //what is this function doing??? do I need it

app.use(express.static('public'));

// GET request for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET request for db.json return all saved notes as JSON
app.get('/db/db.json', (req, res) => res.json(noteData)); 


//work on this POST request
// Post request to add note
app.post('/api/notes', (req, res) => {
    // Log our request to the terminal
    if (req.body && req.params.review_id && req.body.note) {
      console.info(`${req.method} request received to add note`);
  
      // Log the request body
      console.info(req.body);
  
      const reviewId = req.params.review_id;
      const requested = req.body.note;
  
      for (let i = 0; i < reviews.length; i++) {
        const currentNote = reviews[i];
        // console.log(currentReview.review_id, reviewId);
        if (currentReview.review_id === reviewId && requestedNote) {
          currentReview.note += 1;
          res.json(`New note is: ${currentReview.note}`);
          return;
        }
      }
      res.json('Review ID not found');
    }
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);