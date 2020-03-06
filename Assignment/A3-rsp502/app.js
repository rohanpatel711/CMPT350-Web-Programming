/*
Name - Rohan Patel
NSID - rsp502
Student number - 11247205
CMPT 350 Assignment 3
*/
var mysql = require("mysql");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//config
app.set("view engine", "ejs");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// --------------------- DATABASE STUFF --------------------------

// Run MySQL in Terminal
// Create a Database - 	create database cmpt350a3;
// use cmpt350a3;
// Uncomment the Database Script Be cautious the first line of
// every query is a comment of what it does
// And then run the program

// ---------------------------- Create mysql connection -------------------------
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Internet12345!",  // Use your password here. This is my password.
  database: "cmpt350a3"
});

// ---------------------------- TESTING CONNECTION ------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to Database.");
// });

// ---------------------------- CREATE TABLES Login and Chatrooms -------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Generating Chat Room Table in the Database.");
//   var sql = "CREATE TABLE Chatroom (Name VARCHAR(50), Post VARCHAR (300))";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("The Chat Room Table is created.");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to the Database...");
//   console.log("Generating Login Table in the Database.");
//   var sql = "CREATE TABLE Login (username VARCHAR(50), password VARCHAR (50));";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("The Login Table is created.");
//   });
// });

// --------------------------- Insert data in the Table ----------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Inserting data into Login Table.");
//   var sql = "INSERT INTO Login (username, password) VALUES ('rohan', 'patel')";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("Data inserted successfully.");
//   });
// });

// ---------------------------- Read from Database --------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM students", function(err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// --------------------------- SERVER STUFF ------------------------------

app.get("/", function(req, res) {
  res.render("login");
});

app.post("/signedin", urlencodedParser, function(req, res) {
  var username = req.body["username"];
  var password = req.body["password"];
  console.log("@ SIGN IN SUBMIT");

  con.query("SELECT DISTINCT * FROM Login", function(err, result, fields) {
    var allowed = false;
    if (err) throw err;
    result.forEach(e => {
      if (e.username == username && e.password == password) {
        console.log("USER APPROVED");
        allowed = true;
      }
    });
    if (allowed) {
      res.redirect("/home");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/home", function(req, res) {
  con.query("SELECT DISTINCT Name FROM Chatroom", function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    res.render("home", { result: result });
  });
  console.log("@ home");
});

app.get("/create", function(req, res) {
  res.render("create");
  console.log("@ create");
});

app.post("/chatroom/new", urlencodedParser, function(req, res) {
  console.log("Trying to create a new chatroom! -> ");
  var value = req.body["chatroom"];
  console.log(value);

  con.query("INSERT INTO Chatroom (Name, Post) VALUES (?,'')", value, function(
    err,
    result
  ) {
    if (err) throw err;
    console.log("Insert complete!");
  });
  res.redirect("/home");
});

app.get("/home/chatroom/:name", function(req, res) {
  con.query("SELECT DISTINCT * FROM Chatroom", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    var passThru = [];
    result.forEach(e => {
      if (e.Name == req.params.name) {
        passThru.push(e);
      }
    });
    res.render("chatroom", { result: passThru, name: req.params.name });
  });
  console.log("@ board");
});

app.get("/post/:name", function(req, res) {
  res.render("post", { name: req.params.name });
  console.log("@ post");
});

app.post("/post/:name", urlencodedParser, function(req, res) {
  var value = req.body["content"];
  console.log(req.params.name);
  console.log(value);

  con.query(
    "INSERT INTO Chatroom (Name, Post) VALUES ?",
    [[[req.params.name, value]]],
    function(err, result) {
      if (err) throw err;
      console.log("Insert complete!");
    }
  );
  res.redirect("/home");
});

app.post("/post/delete/:name", function(req, res) {
  console.log("Delete Clicked");
  console.log(req.params.name);
  con.query(
    "DELETE FROM Chatroom WHERE Name = " + mysql.escape(req.params.name),
    function(err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );
  res.redirect("/home");
});

app.get("/home/popular", function(req, res) {
  res.render("popular");
  console.log("@ popular");
});

app.listen("3000", function() {
  console.log("Listening to port 3000");
});
