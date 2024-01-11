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
.get((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(poem.comments);
        } else {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem) {
            poem.comments.push(req.body);
            poem.save()
            .then(poem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(poem);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /poems/${req.params.poemId}/comments`);
})
.delete((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem) {
            for (let i = (poem.comments.length-1); i >= 0; i--) {
                poem.comments.id(poem.comments[i]._id).remove();
            }
            poem.save()
            .then(poem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(poem);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

poemRouter.route('/:poemId/comments/:commentId')
.get((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem && poem.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(poem.comments.id(req.params.commentId));
        } else if (!poem) {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /poems/${req.params.poemId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem && poem.comments.id(req.params.commentId)) {
            if (req.body.text) {
                poem.comments.id(req.params.commentId).text = req.body.text;
            }
            poem.save()
            .then(poem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(poem);
            })
            .catch(err => next(err));
        } else if (!poem) {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Poem.findById(req.params.poemId)
    .then(poem => {
        if (poem && poem.comments.id(req.params.commentId)) {
            poem.comments.id(req.params.commentId).remove();
            poem.save()
            .then(poem => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(poem);
            })
            .catch(err => next(err));
        } else if (!poem) {
            err = new Error(`Poem ${req.params.poemId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

module.exports = poemRouter;