const axios = require('axios')
const pets = require('./pet.json')
pets.forEach( (pet) => {
    axios.post('localhost:3001/api/pet', pet).catch(console.log)    
});    