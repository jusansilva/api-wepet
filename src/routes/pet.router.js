require("dotenv").config();
const express = require("express");
const router = express.Router();
const admin = require("../services/firebase");
const db = admin.firestore();
const bucket = admin.storage().bucket("pets");
const { v4: uuidv4 } = require("uuid");

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

router.post("/pet", async (req, res) => {
  try {
    const petDb = db.collection("pets");
    const created = await petDb.doc().set({
      nome: req.body.nome,
      especie: req.body.especie,
      genero: req.body.genero,
      raca: req.body.raca,
      nasc: req.body.nasc,
      responsavelId: req.body.responsavelId,
      foto: req.body.foto,
    });

    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/pet/:id", async (req, res) => {
  try {
    const petDb = db.collection("pets");
    const created = await petDb.doc(req.params.id).update({
      nome: req.body.nome,
      especie: req.body.especie,
      genero: req.body.genero,
      raca: req.body.raca,
      nasc: req.body.nasc,
      responsavelId: req.body.responsavelId,
      foto: req.body.foto,
    });
    res.status(200).send(created);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.put("/pet/change/owner/:id", async (req, res) => {
    try {
      const petDb = db.collection("pets");
      const created = await petDb.doc(req.params.id).update({
        responsavelId: req.body.responsavelId
      });
      res.status(200).send(created);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


router.get("/pet", async (req, res) => {
  try {
    const getPets = await db.collection("pets").get();
    const response = [];
    getPets.forEach((a) => response.push({ id: a.id, ...a.data() }));
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/pet/:id", async (req, res) => {
  try {
    const getPets = await db.collection("pets").doc(req.params.id).get();
    if (!getPets.exists) {
      return res.status(400).send({message:"pet não encontrado", error: true});
    } else {
      const response = {id: getPets.id, ...getPets.data()}
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/pet/owner/:id", async (req, res) => {
    try {
      const getPets = await db.collection("pets").where('responsavelId', '==', req.params.id).get();
      console.log(getPets._docs().length)

      if (getPets._docs().length == 0) {
        return res.status(400).send({message:"Usuario nao tem um pet cadastrado", error: true});
      } else {
        const response = []
        
        getPets.forEach(a =>  response.push({id: a.id, ...a.data()}))
        res.status(200).send(response);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.delete("/pet/:id", async (req, res) => {
  try {
    const petDb = db.collection("pets");
    const getUser = await petDb.doc(req.params.id).delete();
    res.status(200).send(getUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
