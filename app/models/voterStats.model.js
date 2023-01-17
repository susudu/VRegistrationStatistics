const sql = require("./db.js");
// constructor
const Stats = function(stats) {
  this.ssn = stats.ssn;
  this.city = stats.city;
  this.rdate = stats.rdate;
};

Stats.getAllVoters = (result) => {
  let query = "SELECT * FROM user";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("statistics: ", res);
    result(null, res);
  });
};
Stats.getAllVotersCity = (city, result) => {
  let query = "SELECT city as City,Count(iduser) As VCount FROM user"; 
  if (city) {
    query += ` WHERE city = '${city}'`;
  }
  query += ` GROUP BY city`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("statistics: ", res);
    result(null, res);
  });
};
Stats.getAllDateCount = (rdate, result) => {
  let query = "SELECT YEAR(STR_TO_DATE(rdate, '%d/%m/%Y')) as Registered_Year ,COUNT(iduser) AS COUNT FROM user";
  if (rdate) {
    query += ` WHERE YEAR(STR_TO_DATE(rdate, '%d/%m/%Y')) = '${rdate}'`;
  }
  query += ` GROUP BY YEAR(STR_TO_DATE(rdate, '%d/%m/%Y'))`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("statistics: ", res);
    result(null, res);
  });
};
Stats.findBySSN = (ssn, result) => {
  sql.query(`SELECT * FROM user WHERE ssn = '${ssn}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found stats: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found stats with the ssn
    result({ kind: "not_found" }, null);
  });
};
module.exports = Stats;