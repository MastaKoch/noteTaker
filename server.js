// Dependencies

var express= require("express");
var path= require("path");
var fs=require("fs");
const { stringify } = require("querystring");
const { v4: uuidv4 }= require("uuid");
var noteData= require("./Develop/db/db.json");



// sets up express server
var app=express();

// sets up port
var PORT= 8800;

// Sets up express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./Develop/public"));


// GET route for /notes - should return `notes.html` file.

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
})

// GET `/api/notes` - should read `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    fs.readFile(`./Develop/db/db.json`, "utf8", (err, jsonString)=>{
        const data= JSON.parse(jsonString);
       
        res.json(data);
        if (err) {
            console.log("File read failed: ", err)
            return;
        }
      
    });
    
});

// GET route - `*` - should return the `index.html` file.

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

// POST `/api/notes`- should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
    var newNote=req.body;
    newNote.id=uuidv4();

    fs.readFile(`./Develop/db/db.json`, "utf8", (err, jsonString)=>{
        var data= JSON.parse(jsonString);
       

        data.push(newNote);

        fs.writeFile(`./Develop/db/db.json`, JSON.stringify(data), done);

        function done(err) {
        console.log("Note Added.")
    }

    
    res.json(newNote);

    })
 })

/* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each 
note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given 
`id` property, and then rewrite the notes to the `db.json` file. */
// date.now - time in milliseconds

app.delete("/api/notes/:id", function(req, res) {
var oldNote=req.params.id;

for (var i=0; i< noteData.length; i++) {
    if (oldNote === noteData[i].id) {
        noteData.splice(i, 1);
    }
}
fs.writeFile(`./Develop/db/db.json`, JSON.stringify(data), deleted);

function deleted(err) {
    console.log("Note deleted.");
}
res.send(noteData);
})

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });