'use strict'

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var conn = mysql.createConnection({
    host: "localhost",
    user: "'Fekapapa'",
    password: "1q2w3ezv8ta4",
    database: "reddit"
});

app.get('/', function(req, res) {
    conn.query('SELECT * FROM posts', function(err,rows){
        if(err){
            console.log("Error connecting to Db");
            console.log(err);
        }else {
            console.log("Data received from Db:\n");
            console.log(rows);
        };
    res.send(rows);
    });
});

app.post ('/', function(req, res) {
    var timer = Date.now();
    var query = 'INSERT INTO posts (title, href, owner, score, timestamp, id) VALUES ("'
     + req.body.title + '", "' + req.body.href + '", "anonymous", 0, ' + timer + ', 1)';
    conn.query(query), function(err,rows){
    };
});

app.listen(3000, function () {
    console.log('server running');
});

conn.connect(function(err){
    if(err){
        console.log("Error connecting to Db");
    };
    console.log("Connection established");
});
