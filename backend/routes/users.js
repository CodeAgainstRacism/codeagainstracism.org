const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

// Read User
router.get('/user/:id', (req, res) => {
  const uid = req.params.uid;
  firebase
    .database()
    .ref('users/' + uid)
    .once('value')
    .then((data) => {
      if(data.val() != null){
        let val = Object(data.val());
        res.json(val);
      } else {
        res.send('User doesn\'t exist');
      }
    })
    .catch((error) => res.json({ error: error.message }));
});

// Update User
router.post('/user/:id', (req, res) => {
  const { uid, firstName, lastName, email, phoneNumber, description } = req.params.uid;
  const updates = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    description: description,
    updatedAt: serverTimestamp();
  }

  return (
    firebase
      .database()
      .ref('users/' + uid)
      .update(updates)
      .then(() => {
        res.json({ uid })
      })
      .catch((error) => {
        res.json({
          code: error.code,
          error: error.message
        })
      });
  );
});

// Delete User
router.post('/user/:id', (req, res) => {
  const uid = req.params.uid;  // check later if this is correct
  firebase
    .database()
    .ref('users/' + uid)
    .child()
    .remove()    // not sure
    .then(() => {
      res.json({ uid })
    })
    .catch((error) => {
      res.json({
        code: error.code,
        error: error.message
      })
    });
});

module.exports = router;
