var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all users');
})
.post((req, res) => {
    res.end(`Will add the user with name: ${req.body.username} and password: ${req.body.password}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /users');
})
.delete((req, res) => {
    res.end('Will delete all users');
});

router.route('/:userId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send user: ${req.params.userId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /users/${req.params.userId}`);
})
.put((req, res) => {
    res.write(`Editing the user: ${req.params.userId}`);
    res.end(`Will update the user: ${req.body.username} with password: ${req.body.password}`);
})
.delete((req, res) => {
    res.end(`Deleting the user: ${req.params.userId}`);
});

module.exports = router;
