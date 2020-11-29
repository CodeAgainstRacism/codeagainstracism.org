const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

// Write your CRUD routes here 
router.post('/', JSONParser, (req, res) => {
    const { uid, ein, orgname, desc } = req.body;
    const orgid = firebase.database().ref('organizations').push().key; //getting key

    firebase.database().ref('organizations/' + orgid).set({
    id: orgid,
    EIN: ein,
    orgName: orgname,
    description: desc,
    projects:
    [

    ],
    team:
    [

    ],
    useraccount: uid
  }).then( () => {
    res.json({orgid})
    
  }).catch((error) => {
    res.json({
      code: error.code,
      message: error.message,
    });
  });
});

module.exports = router;
