const Stats = require("../models/voterStats.model.js");

// Retrieve all voter stats from the database
exports.findAll = (req, res) => {
  
};
exports.findByCity = (req, res) => {
  
};
// Find a single voter detail with ssn
exports.findOne = (req, res) => {
  
};

// Retrieve all voter stats from the database
exports.findAll = (req, res) => {
  Stats.getAllVoters( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving voter stats."
      });
    else res.send(data);
  });
};

// Retrieve voter registered voter counts by city
exports.findByCity = (req, res) => {
  Stats.getAllVotersCity( (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving voter stats by city."
      });
    else res.send(data);
  });
};

//Retrieve a single object
exports.findOne = (req, res) => {
  Stats.findBySSN(req.params.ssn, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found exchange with ssn ${req.params.ssn}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving voter stats with ssn" + req.params.ssn
        });
      }
    } else res.send(data);
  });
};

