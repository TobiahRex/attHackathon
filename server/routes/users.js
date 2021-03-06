'use strict';

let express = require('express');
let router  = express.Router();
let User    = require('../models/user');

router.post('/register', (req, res) => User.register(req.body, res.handle));

router.route('/login')
.post((req, res)=>
  User.authenticate(req.body, (err, tokenPkg ) => err ? res.status(400).send(err) :
  res.cookie('accessToken', tokenPkg.token).status(200).send('User is logged in.')))
.delete((req, res)=> res.clearCookie('accessToken').status(200).send({SUCCESS : `User has been Logged out.`}));

router.post('/logout', (req, res)=> res.clearCookie('accessToken').send());

router.get('/profile', User.loginVerify, (req, res)=> res.send(req.user));

router.get('/verify/:token', (req, res)=> User.emailVerify(req.params.token, (err, dbUser, result) => err ? res.status(400).send(err) : res.redirect('/#/login')));

router.route('/')
.get((req, res) => User.find({}, res.handle))
.delete((req, res)=> User.remove({}, res.handle));

router.route('/:id')
.get((req, res)=> User.getUser(req.params.id, res.handle))
.delete((req, res) => User.removeUser(req.params.id, res.handle))
.put((req, res)=> {
  let userObj = {id : req.params.id, body : req.body};
  User.updateUser(userObj, res.handle);
});

module.exports = router;
