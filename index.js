const express = require("express");

const db = require("./data/db.js");
const server = express();
const PORT = 4000;

//Middleware
server.use(express.json());

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
    return res.status(400).json({errorMessage: "Please provide name and bio for the user."})

  db.insert(user)
    .then(user => {  
        res.status(201).json({ success: true, user: user });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'Please provide name and bio for the user.' });
    });
});

//PUT
server.put("/api/users/:id", (req, res) => {});

//DELETE
server.delete("/api/users/:id", (req, res) => {});

server.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
