const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

/* 
  Log users in. 
    If succeed, respond with uid and status 200. 
    If fail, respond with status 200, errorCode and errorMessage
  To test this route on POSTMAN, Choose Body -> raw + JSON -> localhost:5000/api/auth/signin
  To test this with HTTPie, http POST localhost:5000/api/auth/login username=xxx password=xxx email=xxx@gmail.com
*/
router.post('/login', JSONParser, (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => res.json({ uid: user.uid }))
    .catch((error) => {
      res.json({
        code: error.code,
        message: error.message,
      });
    });
});

/*
  Sign up with email and password,
    If succeed, respond with uid and status 200. 
    If fail, respond with status 200, errorCode and errorMessage
 To test this route on POSTMAN, Choose Body -> raw + JSON -> localhost:5000/api/auth/signup username=xxx password=xxx email=xxx@gmail.com
 To test this with HTTPie, http POST localhost:5000/api/auth/signup username=xxx password=xxx email=xxx@gmail.com
*/
router.post('/signup', JSONParser, (req, res) => {
  const { email, username, password } = req.body;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userRecord) {
      const { uid } = userRecord.user;
      firebase
        .database()
        .ref('users/' + uid)
        .set({
          id: uid,
          email,
          username,
        });
      res.json(uid);
    })
    .catch((error) => {
      res.json({
        code: error.code,
        message: error.message,
      });
    });
});

/*
  Get user's information by uid
  To test this with HTTPie, http GET localhost:5000/api/auth/xxxxxxxxxx
*/
router.get('/:uid', (req, res) => {
  const uid = req.params.uid;
  firebase
    .database()
    .ref('users/' + uid)
    .once('value')
    .then((data) => {
      if (data.val() != null) {
        let val = Object(data.val());
        res.json(val);
      } else {
        res.send('DOESNT EXIST');
      }
    })
    .catch((err) => res.json({ err: err.message }));
});

module.exports = router;
