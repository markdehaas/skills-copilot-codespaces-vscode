// Create web server

// Import module
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const fs = require('fs');
const moment = require('moment');

// Set view engine
app.set('view engine', 'pug');

// Set body-parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set static files
app.use(express.static('public'));

// Set route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', (req, res) => {
    let comments = fs.readFileSync('./data/comments.json', 'utf-8');
    comments = JSON.parse(comments);
    res.render('comments', { comments: comments });
});

app.post('/comments', (req, res) => {
    let comments = fs.readFileSync('./data/comments.json', 'utf-8');
    comments = JSON.parse(comments);
    let comment = {
        id: comments.length + 1,
        name: req.body.name,
        email: req.body.email,
        content: req.body.content,
        time: moment().format("DD/MM/YYYY HH:mm:ss")
    }
    comments.push(comment);
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    let comments = fs.readFileSync('./data/comments.json', 'utf-8');
    comments = JSON.parse(comments);
    let comment = comments.find((comment) => {
        return comment.id === parseInt(req.params.id);
    });
    res.render('comment', { comment: comment });
});

app.get('/comments/:id/delete', (req, res) => {
    let comments = fs.readFileSync('./data/comments.json', 'utf-8');
    comments = JSON.parse(comments);
    let comment = comments.find((comment) => {
        return comment.id === parseInt(req.params.id);
    });
    res.render('delete', { comment: comment });
});

app.post('/comments/:id/delete', (req, res) => {
    let comments = fs.readFileSync('./data/comments.json', 'utf-8');
    comments = JSON.parse(comments);
    let comment = comments.find((comment) => {
        return comment.id === parseInt(req.params.id);
    });
    let index = comments.indexOf(comment);
    comments.splice(index, 1);
    fs.writeFileSync('./data/comments