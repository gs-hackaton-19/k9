const axios = require('axios')
const pets = require('./pet.json')
pets.forEach( (pet) => {
    axios.post('http://localhost:3001/api/pet', pet).then("Success").catch(console.log)    
});    