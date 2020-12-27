const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');
const { compile } = require('morgan');

const JSONParser = bodyParser.json();

// Read User
router.get('/:uid', (req, res) => {
  const id = req.params.id;
  firebase
    .database()
    .ref('users/' + id)
    .once('value')
    .then((data) => {
      if(data.val() != null){
        let val = Object(data.val());
        res.json(val);
      } else {
        res.json({ error: 'User doesn\'t exist' });
      }
    })
    .catch((error) => res.json({ error: error.message }));
});

// Update User
router.patch('/:uid', (req, res) => {
  const id  = req.params.id;
  const { firstName, lastName, email, phoneNumber, description } = req.params.body;

  const updates = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    description: description,
    updatedAt: serverTimestamp(),
  }

  return (
    firebase
      .database()
      .ref('users/' + id)
      .update(updates)
      .then(() => {
        res.json({ status: 200, message: 'Updated user ' + uid })
      })
      .catch((error) => {
        res.json({
          code: error.code,
          error: error.message
        })
      })
  );
});

// Delete User
router.delete('/:uid', (req, res) => {
  const id = req.params.id;  // check later if this is correct
  firebase
    .database()
    .ref('users/' + id)
    .remove()    // not sure
    .then(() => {
      res.json({ status: 200, message: 'Deleted user ' + uid })
    })
    .catch((error) => {
      res.json({
        code: error.code,
        error: error.message
      })
    });
});

module.exports = router;
