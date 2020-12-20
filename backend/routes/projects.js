const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');
const { compile } = require('morgan');

const JSONParser = bodyParser.json();

// Write your CRUD routes here 
router.post('/', JSONParser, (req, res) => {
    const { projname, desc, qual, sdate, edate, image, feat, comp, like, cat, uat } = req.body;
    const projid = firebase.database().ref('projects').push().key; //getting key

    firebase.database().ref('projects/' + projid).set({
    id: projid,
    projName: projname,
    description: desc,
    qualifications: qual,
    startDate: sdate,
    endDate: edate,
    imageURL: image,
    isFeatured: feat,
    isCompleted: comp,
    likeCount: like,
    createdAt: cat,
    updatedAt: uat,
    orgID:
    [

    ],
    team:
    [

    ]
  }).then( () => {
    res.json({projid})
    
  }).catch((error) => {
    res.json({
      code: error.code,
      message: error.message,
    });
  });
});

module.exports = router;
