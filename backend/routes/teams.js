const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');
const JSONParser = bodyParser.json();

const teamNameMax = 40;

// POST is for testing only

router.post('/', JSONParser, (req, res) => {
  const tid = firebase.database().ref('users/teams').push().key; //getting key
  const { teamName, memberArr } = req.body;

  firebase.database().ref('users/teams/' + tid).set({
    id: tid,
    teamName,
    memberArr,
  }).then(() => {
    res.json({ tid })
  }).catch((error) => res.json({
    status: error.code,
    message: error.message,
  }));
});

router.get('/:tid', (req, res) => {
  const { tid } = req.params;

  firebase.database().ref('users/teams/' + tid).once('value').then((data) => {
    if (data.val() != null) {
      res.json(Object(data.val()));
    } else {
      res.json({ error: 'team does not exist' });
    }
  }).catch((error) => res.json({
    status: error.code,
    message: error.message,
  }));
});

router.patch('/:tid', (req, res) => {
  const { tid } = req.params;
  const { teamName, memberArr } = req.body;

  firebase.database().ref('users/teams/' + tid).update({
    id: tid,
    teamName,
    memberArr
  }).then(() => {
    if (typeof (teamName) != 'string' || teamName.length > teamNameMax) {
      res.json({ status: 400, message: `team name must be a string with less than ${teamNameMax} characters.` })
    } else {
      res.json({ status: 200, message: 'Successfully updated', id: tid, teamName, memberArr })
    }
  }).catch((error) => res.json({
    status: error.code,
    message: error.message
  }));
});

router.delete('/:tid', (req, res) => {
  const { tid } = req.params;
  firebase.database().ref('users/teams/' + tid).remove(
  ).then(() =>
    res.json({ status: 200, message: 'Successfully deleted' })
  ).catch((error) => res.json({
    status: error.code,
    message: error.message,
  }));
});

module.exports = router;