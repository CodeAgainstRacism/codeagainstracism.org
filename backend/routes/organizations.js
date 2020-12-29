const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const bodyParser = require('body-parser');
const JSONParser = bodyParser.json();

const orgNameMax = 40;
const descriptionMax = 100;
const nameMax = 40;
const usernameMax = 40;

// RUD, no C

// router.post('/', JSONParser, (req, res) => {
//   const uid = firebase.database().ref('organizations').push().key; //getting key
//   const { EIN, orgName, description, email, firstName, lastName, phoneNumber, username } = req.body;

//   firebase.database().ref('organizations/' + orgid).set({
//     id: uid,
//     EIN,
//     orgName,
//     description,
//     email,
//     firstName,
//     lastName,
//     phoneNumber,
//     username
//   }).then(() => {
//     res.json({ orgid })
//   }).catch((error) => {
//     res.json({
//       code: error.code,
//       message: error.message,
//     });
//   });
// });

router.get('/:uid', (req, res) => {
  const { uid } = req.params;

  firebase.database().ref('users/organizations/' + uid).once('value').then((data) => {
    if (data.val() != null) {
      res.json(Object(data.val()));
    } else {
      res.json({ err: 'Organization does not exist' });
    }
  }).catch((err) => res.json({ err: err.message }));
});

router.patch('/:uid', (req, res) => {
  const { uid } = req.params;
  const { EIN, orgName, description, email, firstName, lastName, phoneNumber, username } = req.body;

  firebase.database().ref('users/organizations/' + uid).update({
    id: uid,
    EIN,
    orgName,
    description,
    email,
    firstName,
    lastName,
    phoneNumber,
    username
  }).then(() => {
    if (typeof(EIN) != 'number' || (EIN < 100000000 && EIN >= 1000000000)) {
      res.json({ status: 400, message: 'EIN must be a 9 digit number.' })
    } else if (typeof(orgName) != 'string' || orgName.length > orgNameMax) {
      res.json({ status: 400, message: `Organization name must be a string with less than ${orgNameMax} characters.` })
    } else if (typeof(description) != 'string' || description.length > descriptionMax) {
      res.json({ status: 400, message: `Organization name must be a string with less than ${descriptionMax} characters.` })
    } else if (typeof(email) != 'string' || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) == false) {
      res.json({ status: 400, message: 'Please enter a valid email address.' })
    } else if (typeof(firstName) != 'string' || firstName.length > nameMax) {
      res.json({ status: 400, message: `First name must be a string with less than ${nameMax} characters.` })
    } else if (typeof(lastName) != 'string' || lastName.length > nameMax) {
      res.json({ status: 400, message: `Last name must be a string with less than ${nameMax} characters.` })
    } else if (typeof(phoneNumber) != 'string' || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNumber) == false) {
      res.json({ status: 400, message: 'Please enter a valid US phone number. It can be either formatted as: XXX-XXX-XXXX, XXX.XXX.XXXX or XXX XXX XXXX.' })
    } else if (typeof(username) != 'string' || username.length > usernameMax) {
      res.json({ status: 400, message: `Username must be a string with less than ${usernameMax} characters.` })
    } else {
      res.json({ status: 200, message: 'Successfully updated' })
    }
  }
  ).catch((err) => res.json({ err: err.message }));
});

router.delete('/:uid', (req, res) => {
  const { uid } = req.params;
  firebase.database().ref('users/organizations/' + uid).remove(
  ).then(() =>
    res.json({ status: 200, message: 'Successfully deleted' })
  ).catch((err) => res.json({ error: err.message }));
});

module.exports = router;