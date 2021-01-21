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
var PORT= process.env.PORT || 8800;

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

// post a note
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

// Delete feature
app.delete(`/api/notes/:id`, function(req, res) {
    var oldNote=req.params.id;

    for (var i=0; i <noteData.length; i++) {
        if (oldNote === noteData[i].id) {
            noteData.splice(i, 1);
        }
    }
    res.send(noteData);
    fs.writeFile('Develop/db/db.json', JSON.stringify(noteData), err=>{
        if (err) throw err;
        return true;
    })
})

// LISTENER
app.listen(process.env.PORT || 8800, function() {
    console.log("Express server listening on port %d in %s mode: " + this.address().port, app.settings.env);
  });