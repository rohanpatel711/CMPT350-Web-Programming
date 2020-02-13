/*
Rohan Patel
11247205
rsp502
*/
 const http = require("http");
var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Internet12345!",
    database: "rsp502a2"
});

db.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log("Connected to database.")
})

/*Query Strings*/
let users = "SELECT * FROM users_info;";
let posts = "SELECT * FROM posts;";
let contacts = "SELECT * FROM contacts;";
let likes = "SELECT * FROM likes;";
let messages = "SELECT * FROM messages;";

function executeQuery(query, cb) {
    db.query(query, function(error, out, fields) {
        if (error) {
            throw error;
        }
        cb(out);
    })
}


http.createServer(function (req, res) {

    res.writeHead(300, {'Content-Type': 'text/html'});

    var url = req.url;


    if(url ==="/users") {
        res.write("<h1>Users table</h1>");
        res.write("<a href=\"http://localhost:3000\">Back to home</a><br></br>")
        executeQuery(users, function(out){
            res.write("<table><tr>");
            for (let column in out[0]) {
                res.write("<th style=\"padding: 11px;border-bottom: 3px solid grey;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+column+"</th>");
            }
            res.write("</tr>");

            for (let row in out) {
                res.write("<tr>");
                for (let column in out[row]) {
                    res.write("<td style=\"border-bottom: 1px dashed grey;padding: 3px;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+out[row][column]+"</td>");
                }
                res.write("</tr>");
            }
            res.end("</table>");
        });
    }

    else if(url ==="/contacts") {
        res.write("<h1>Contacts table</h1>");
        res.write("<a href=\"http://localhost:3000\">Back to home</a><br></br>")
        executeQuery(contacts, function(out){
            res.write("<table><tr>");
            for (let column in out[0]) {
                res.write("<th style=\"padding: 11px;border-bottom: 3px solid grey;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+column+"</th>");
            }
            res.write("</tr>");

            for (let row in out) {
                res.write("<tr>");
                for (let column in out[row]) {
                    res.write("<td style=\"border-bottom: 1px dashed grey;padding: 3px;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+out[row][column]+"</td>");
                }
                res.write("</tr>");
            }
            res.end("</table>");
        });
    }

    /*Messages url*/
    else if(url ==="/messages") {
        res.write("<h1>Messages table</h1>");
        res.write("<a href=\"http://localhost:3000\">Back to home</a><br></br>")
        executeQuery(messages, function(out){
            res.write("<table><tr>");
            for (let column in out[0]) {
                res.write("<th style=\"padding: 11px;border-bottom: 3px solid grey;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+column+"</th>");
            }
            res.write("</tr>");

            for (let row in out) {
                res.write("<tr>");
                for (let column in out[row]) {
                    res.write("<td style=\"border-bottom: 1px dashed grey;padding: 3px;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+out[row][column]+"</td>");
                }
                res.write("</tr>");
            }
            res.end("</table>");
        });
    }

    /*Posts url*/
    else if(url ==="/posts") {
        res.write("<h1>Posts table</h1>");
        res.write("<a href=\"http://localhost:3000\">Back to home</a><br></br>")
        executeQuery(posts, function(out){
            res.write("<table><tr>");
            for (let column in out[0]) {
                res.write("<th style=\"padding: 11px;border-bottom: 3px solid grey;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+column+"</th>");
            }
            res.write("</tr>");

            for (let row in out) {
                res.write("<tr>");
                for (let column in out[row]) {
                    res.write("<td style=\"border-bottom: 1px dashed grey;padding: 3px;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+out[row][column]+"</td>");
                }
                res.write("</tr>");
            }
            res.end("</table>");
        });
    }

    /*Likes url*/
    else if(url ==="/likes") {
        res.write("<h1>Likes table</h1>");
        res.write("<a href=\"http://localhost:3000\">Back to home</a><br></br>")
        executeQuery(likes, function(out){
            res.write("<table><tr>");
            for (let column in out[0]) {
                res.write("<th style=\"padding: 11px;border-bottom: 3px solid grey;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+column+"</th>");
            }
            res.write("</tr>");

            for (let row in out) {
                res.write("<tr>");
                for (let column in out[row]) {
                    res.write("<td style=\"border-bottom: 1px dashed grey;padding: 3px;border-left: 1px dashed grey;border-right: 1px dashed grey;text-align:center;\">"+out[row][column]+"</td>");
                }
                res.write("</tr>");
            }
            res.end("</table>");
        });
    }

    /*Home url (this is where you go if you input an invalid url)*/
    else {
        res.write("<h1>List of Tables:</h1>");
        res.write("<ul><li><b></b> <a href=\"http://localhost:3000/users\">User Data</a></li>")
        res.write("<li><b></b> <a href=\"http://localhost:3000/contacts\">Contact Data</a></li>")
        res.write("<li><b></b> <a href=\"http://localhost:3000/messages\">Message Data</a></li>")
        res.write("<li><b></b> <a href=\"http://localhost:3000/posts\">Post Data</a></li>")
        res.write("<li><b></b> <a href=\"http://localhost:3000/likes\">Like Data</a></li></ul")
        res.end();
    }
}).listen(3000, function() {
    console.log("Server start at port 3000.");
});
