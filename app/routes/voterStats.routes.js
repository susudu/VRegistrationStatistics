module.exports = app => {
  const vstats = require("../controllers/voterStats.controller.js");
  var router = require("express").Router();
  // Retrieve all voter stats
  router.get("/allVoters", vstats.findAll);
  // Retrieve a single voter stats with ssn
  router.get("/:ssn", vstats.findOne);
  // Retrieve voter stats by city
  router.get("/votersByCity", vstats.findByCity);
  // Retrieve voter stats by age range
  //router.get("/:id", vstats.findOne);
  //app.use('/api/vstats', router); 
  app.use('/api/vstats', router); 
  
};