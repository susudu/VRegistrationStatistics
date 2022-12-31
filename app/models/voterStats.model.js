const sql = require("./db.js");
// constructor
const Stats = function(stats) {
  this.ssn = stats.ssn
};

Stats.findBySSN = (ssn, result) => {
  sql.query(`SELECT * FROM user WHERE ssn = ${ssn}`, (err, res) => {
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
Stats.getAllVotersCity = (result) => {
  let query = "SELECT city as City,Count(iduser) As VCount FROM user GROUP BY city";
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
module.exports = Stats;