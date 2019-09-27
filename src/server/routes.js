const express = require('express');
const router = express.Router();
const Pet = require('./model/Pet');

//const cageOpenerURL = 'https://ketrecnyito.url';

router.get('/api/pet/:id', async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id);
  return res.json(pet);
});

router.get('/api/pet', async (req, res) => {
  const pets = await Pet.find();
  return res.json(pets);
});

router.post('/api/pet', async (req, res) => {
  const { body } = req;
  const pet = await Pet.create(body);
  return res.json(pet);
});

router.post('/api/pet/:id/like', async (req, res) => {
  return res.json({ pet: 'Allatka' });
});

router.post('/api/pet/:id/kill', async (req, res) => {
  return res.json({ pet: 'Allatka' });
});

router.get('/api/pet/:id/take', async (req, res) => {
  //await axios.get(cageOpenerURL);
  return res.send('Success');
});

module.exports = router;
