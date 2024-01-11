const express = require('express');
const poemRouter = express.Router();

poemRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('This will send all poems to you');
})
.post((req, res) => {
    res.end(`Will add the poem: ${req.body.title} with content: ${req.body.content}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /poems');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /poems');
})

poemRouter.route('/:poemId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send a specific poem');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /poems/${req.params.poemId}`);
})
.put((req, res) => {
    res.write(`Editing the poem: ${req.params.poemId}\n`);
    res.end(`Will update the poem: ${req.body.title} with content: ${req.body.content}`);
})
.delete((req, res) => {
    res.end(`Deleting poem: ${req.params.poemId}`);
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
