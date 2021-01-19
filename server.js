// Dependencies

var express= require("express");

// sets up express server
var app=express();

// sets up port
var PORT= 8800;

// Sets up express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTES
// =========================================================

// HTML ROUTES
// =========================================================
// GET route for /notes - should return `notes.html` file.

// GET route - `*` - should return the `index.html` file.

// API ROUTES
// =========================================================


// GET `/api/notes` - should read `db.json` file and return all saved notes as JSON.


// POST `/api/notes`- should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.


/* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each 
note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given 
`id` property, and then rewrite the notes to the `db.json` file. */


// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });