
const express = require('express');

const db = require('./data/db.js');
const server = express();
const PORT = 4000;

//Middleware
server.use(express.json());

// ---- ROUTES ---- //

//GET
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
    .findById(userId)
    .then(user => {
        if(user){
            res.status(200).json(user) 
        }else{
            res.status(404).json({success: false, message: `There is no user attached to the ID of ${userId}`})
        }
        
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
});

//POST
server.post('/api/users', (req, res) => {
    const user = req.body;
    db.insert(user)
    .then(user => {
        res.status(201).json({success: true, user})
    })
    .catch(({code, message}) => {
        res.status(code).json({success: false, message})
    })
});

//PUT
server.put('/api/users/:id', (req, res) => {
    
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
    
});


server.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})