const express = require('express');
const Poem = require('../models/poem');

const poemRouter = express.Router();

poemRouter.route('/')
.get((req, res, next) => {
    Poem.find()
    .then(poems => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(poems);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Poem.create(req.body)
    .then(poem => {
        console.log('Poem uploaded ', poem);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(poem);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /poems');
})
.delete((req, res, next) => {
    Poem.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

poemRouter.route('/:poemId')
.get((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(poem);
    })
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /poems/${req.params.poemId}`);
})
.put((req, res, next) => {
    Poem.findByIdAndUpdate(req.params.poemId, {
        $set: req.body
    }, { new: true })
    .then(poem => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(poem);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Poem.findByIdAndDelete(req.params.poemId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

poemRouter.route('/:poemId/comments')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send all comments on poem: ${req.params.poemId}`);
})
.post((req, res) => {
    res.end(`Will post a comment to ${req.params.poemId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /poems/${req.params.poemId}/comments`);
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end(`DELETE operation not supported on /poems/${req.params.poemId}/comments`);
})

poemRouter.route('/:poemId/comments/:commentId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send a specific comment: ${req.params.commentId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /poems/${req.params.poemId}/comments/${req.params.commentId}`);
})
.put((req, res) => {
    res.end(`Will update comment: ${req.params.commentId}`);
})
.delete((req, res) => {
    res.end(`Will delete comment: ${req.params.commentId}`);
})

module.exports = poemRouter;
