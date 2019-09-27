const express = require('express');
const router = express.Router();
const Pet = require('./model/Pet');
const axios = require('axios');
const TakeHomeRequest = require('./model/TakeHomeRequest');

const cageOpenerURL = 'http://192.168.43.222:3002/cage/open';

router.get('/api/pet/:id', async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id);
  return res.json(pet);
});

router.get('/api/pet', async (req, res) => {
  const filter = req.query;
  const pets = await Pet.find(filter);
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
  const { id: pet } = req.params;
  const request = await TakeHomeRequest.create({ userId: 1, pet });
  return res.json(request);
});

router.get('/api/takehomerequest', async (req, res) => {
  const requests = await TakeHomeRequest
    .find({ approved: false, disapproved: false })
    .sort({ requestDate: -1 })
    .populate('pet')
    .lean();
  res.json(requests);
});

router.get('/api/takehomerequest/:id', async (req, res) => {
  const { id } = req.params;
  const requests = await TakeHomeRequest
    .findById(id)
    .populate('pet')
    .lean();
  res.json(requests);
});

router.post('/api/takehomerequest/:id/approve', async (req, res) => {
  const { id: _id } = req.params;
  const approve = req.body.approve === 'false' ? false : true;
  const request = await TakeHomeRequest.findOneAndUpdate({ _id },
    { approved: approve, disapproved: !approve },
    {new: true});
  await axios.get(cageOpenerURL);
  res.json(request);
});

module.exports = router;
