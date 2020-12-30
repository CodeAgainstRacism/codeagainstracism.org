const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');
const { compile } = require('morgan');

const JSONParser = bodyParser.json();

// Read User
router.get('/:id', (req, res) => {
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
router.patch('/:id', (req, res) => {
  const id  = req.params.id;
  const { firstName, lastName, email, phoneNumber, description } = req.body;
  const { serverTimestamp } = firebase.firestore.FieldValue;

  return (
    firebase
      .database()
      .ref('users/' + id)
      .update({
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        phoneNumber: phoneNumber || null,
        description: description || null,
        updatedAt: serverTimestamp(),     // weird response on postman 
      })
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
router.delete('/:id', (req, res) => {
  const id = req.params.id;  // check later if this is correct
  firebase
    .database()
    .ref('users/' + id)
    .remove()
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
