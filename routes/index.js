var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Express' });
});
router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Express' });
});
router.get('/updateprofile', function (req, res, next) {
    res.render('register', { title: 'Express' });
});
router.get('/applypolicy', function (req, res, next) {
    res.render('applypolicy', { title: 'Express' });
});
router.get('/updatepolicy', function (req, res, next) {
    res.render('applypolicy', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
    res.redirect(302, '/afterlogin');
});
router.get('/afterlogin', function (req, res, next) {
    res.render('afterlogin', { title: 'Express' });
});

router.get('/appliedpolicies', function (req, res, next) {
    res.render('appliedpolicies', { title: 'Express' });
});

module.exports = router;
