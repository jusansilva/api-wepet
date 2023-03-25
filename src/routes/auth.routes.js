require('dotenv').config()
const express = require("express");
const router = express.Router();
const admin = require("../services/firebase")



router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      res.status(200).send(userRecord);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const userRecord = await admin.auth().getUserByEmail(email);
      const link = await admin.auth().generateSignInWithEmailLink(userRecord.email, {
        url: process.env.URL,
      });
      //const token = await admin.auth().createCustomToken(userRecord.uid);
      res.status(200).send({ link });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  router.post('/verifyToken', async (req, res) => {
    try {
      const { token } = req.body;
      const decodedToken = await admin.auth().verifyIdToken(token);
      res.status(200).send(decodedToken);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  module.exports = router;