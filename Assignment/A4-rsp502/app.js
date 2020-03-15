/*
Name - Rohan Patel
NSID - rsp502
Student number - 11247205
CMPT 350 Assignment 4
*/

var mysql = require("mysql");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//config
app.set("view engine", "ejs");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// ---------------------------- DATABASE STUFF ----------------------------------


// Run MySQL in Terminal
// Create a Database Using Command - "create database rsp502a4;"
// then use this command - "use cmpt350a3;"
// Uncomment the Database Script Be cautious the first line of
// every query is a comment of what it does
// You will have to uncomment only one query at a time and keep the others commented.
// Once all the queries are executed one by one,, then run the program

// ---------------------------- CREATE MYSQL CONNECTION -------------------------
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Internet12345!",  // Use your password here. This is my password.
  database: "rsp502a4"
});

// ---------------------------- TESTING CONNECTION ------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to MySQL Database!");
// });


// In case of authentication error
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';

// ---------------------------- CREATE TABLES -----------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Creating Board Table!");
//   var sql = "CREATE TABLE Board (Name VARCHAR(50), Post VARCHAR (300));";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("table created!");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!!!");
//   console.log("Creating Login Table!");
//   var sql = "CREATE TABLE Login (username VARCHAR(50), password VARCHAR (50));";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("table created!");
//   });
// });

// ---------------------------- INSERT INTO TABLE --------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Inserting into Login Table!");
//   var sql = "INSERT INTO Login (username, password) VALUES ('rohan', 'patel')";
//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

// ---------------------------- READ FROM DATABASE -------------------------------
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM Login", function(err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
//

// ------------------------------ SERVER STUFF ----------------------------------

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.get("/home", function(req, res) {
  con.query("SELECT DISTINCT Name FROM Board", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render("home", { result: result });
  });
  console.log("@home");
});

app.get("/create", function(req, res) {
  res.render("create");
  console.log("@ create");
});

app.post("/board/new", urlencodedParser, function(req, res) {
  console.log("Creating A New Board.");
  var value = req.body["board"];
  console.log(value);
  con.query("INSERT INTO Board (Name, Post) VALUES (?,'')", value, function(
    err, result
  ) {
    if (err) throw err;
    console.log("Insertion successful.");
  });
  res.redirect("/home");
});

app.get("/home/board/:name", function(req, res) {
  con.query("SELECT DISTINCT * FROM Board", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log("req.params.name : " + req.params.name); //TESTING
    var passThru = [];
    result.forEach(e => {
      if (e.Name === req.params.name) {
        passThru.push(e);
      }
    });
    console.log("pass: " + passThru);
    res.render("board", { result: passThru, name: req.params.name });
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
    "INSERT INTO Board (Name, Post) VALUES ?",
    [[[req.params.name, value]]],
    function(err, result) {
      if (err) throw err;
      console.log("Insertion successful");
    }
  );
  res.redirect("/home");
});

// Listens to port 3000
app.listen("3000", function() {
  console.log("Listening to port 3000");
});
