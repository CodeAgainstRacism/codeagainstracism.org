const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');

const JSONParser = bodyParser.json();

// Write your CRUD routes here 
//make sure to use /api/projects referring to the server.js file

//post
  router.post('/', JSONParser, (req, res) => {
    //postman names must match exactly req body and firebase fields must match as well
    const {projName, description, qualifications, startDate, endDate, imageURL, isFeatured, isCompleted, likeCount, createdAt, updatedAt} = req.body;
    const id = firebase.database().ref('projects/').push().key; //getting key, creating the directory for the key(?)

    firebase.database().ref('projects/' + id).set({
      id, 
      projName , 
      description, 
      qualifications, 
      startDate, 
      endDate, 
      imageURL, 
      isFeatured, 
      isCompleted, 
      likeCount, 
      createdAt, 
      updatedAt}
     ).then( () => {
    res.json({id})
    
    }).catch((error) => {
    res.json({
      code: error.code,
      message: error.message,
    });
  });
});

//get
// /api/projects
router.get('/:id', (req, res) => {
  const id = req.params.id;

  firebase.database().ref('projects/' + id)
  .once('value')
  .then( (data) => {
    if (data.val()!= null){
      let val = Object.values(data.val());
      val.forEach((element) => {
        if (element.events != null) {
          element.events = Object.values(element.events);
        }
      });
      res.json(val)
    }
    else{
      res.send('DOESNT EXIST');
    }
  
}).catch((error) => {
  res.json({
    code: error.code,
    message: error.message,
  });
});
});

//get all projects
router.get('/', (req, res) => {
  firebase.database().ref('projects/')
  .once('value')
  .then( (data) => {
    if (data.val()!= null){
      let val = Object.values(data.val());
      val.forEach((element) => {
        if (element.events != null) {
          element.events = Object.values(element.events);
        }
      });
      res.json(val)
    }
    else{
      res.send('DOESNT EXIST');
    }
  
  }).catch((error) => {
    res.json({
      code: error.code,
      message: error.message,
    });
});
});

//update
router.patch('/:id', (req, res) => {
const {id} = req.params; //the certain project getting updated
const {projName, description, qualifications, startDate, endDate, imageURL, isFeatured, isCompleted, likeCount} = req.body; //the things that are being sent over
firebase.database().ref('projects/' + id)
  .update({
    //take out the nulls
    projName: projName , 
    description: description ,
    qualifications: qualifications ,
    startDate: startDate ,
    endDate: endDate ,
    imageURL: imageURL ,
    isFeatured: isFeatured ,
    isCompleted: isCompleted ,
    likeCount: likeCount ,
    //this one kinda wonky
    //firebase.database.ServerValue.TIMESTAMP
    //not using firestore
    updatedAt: firebase.firestore.FieldValue.serverTimestamp() //|| null
  })
  .then(() => 
    res.json({status: 200, message: 'Successfully updated project'})
  )
  .catch((err) => res.jscon({error:err.message}));

});

//delete 
router.delete('/:id', (req, res) => {
  const{id} = req.params;
  firebase.database().ref('projects/' + id)
    .remove()
    .then(() => 
        res.json({ status: 200, message: 'Successfully deleted project'})
    )
    .catch((err) => res.json({error: err.message}));
});

module.exports = router;
