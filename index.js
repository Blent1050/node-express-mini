const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");
const server = express();
const PORT = 4000;

//Middleware
server.use(express.json());
server.use(cors());
// ---- ROUTES ---- //

//GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ success: false, error: "The user's information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(user => {
        if(!user)
            return res.status(404).json({message: "The user with the specified ID does not exist."})
        res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ success: false, error: "The user's information could not be retrieved." });
    });
});

//POST
server.post("/api/users", (req, res) => {
  const user = req.body;
  //Check if name and bio keys are attached to request. If not, return error code.
  if(!user.name || !user.bio)
    return res.status(400).json({error: "Please provide name and bio for the user."})

  db.insert(user)
    .then(user => {  
        res.status(201).json({ success: true, user: user });
    })
    .catch(() => {
      res.status(500).json({ error: 'Please provide name and bio for the user.' });
    });
});

//PUT
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;

    db.update(id, user)
    .then(updatedUser => {
        if(!updatedUser)
             return res.status(404).json({success: false, message: 'The user with the specified ID cannot be found.'})
        else if(!user.name || !user.bio)
            return res.status(400).json({success: false, message: 'A user requires a name and bio in order to be updated.'})
        else
            res.status(200).json({success: true, user})
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." });
    })
});

//DELETE
server.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
    .then(deleted => {
        if(!deleted)
            return res.status(404).json({message: "The user with the specified ID does not exist."})
        res.status(204).end()
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    })
});

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
