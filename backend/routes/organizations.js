const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

// Write your CRUD routes here 

router.get('/:uid', (req, res) => {
    const uid = req.params.uid;
    firebase.database().ref('organizations/'+ uid)
      .once('value')
      .then((data) => {
        if (data.val() != null) {
          let val = Object.values(data.val());
          val.forEach((element) => {
            if (element.events != null) {
              element.events = Object.values(element.events);
            }
          });
          res.json(val);
        } else {
          res.json({ err: 'DOESNT EXIST' });
        }
      })
      .catch((err) => res.json({ err: err.message }));
  });

module.exports = router;
