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


// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });