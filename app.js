const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.static("public"));
app.use(express.json());

const port = 8080;

const mysql = require("mysql");

//Create DB connection
const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

//You can use this endpoint to check the health status of the server
app.get("/", async (req, res) => {
  console.log("GET: / called");
  res.status(200);
  res.send("Health check OK.");
});

//This endpoint will return server info
app.get("/server-info", async (req, res) => {
  console.log("GET: /server-info called");
  res.status(200);
  res.send({
    availabilityZone: process.env.AZ_VAL,
    instanceId: process.env.INSTANCE_ID,
  });
});

//This endpoint will return all employee data from our database
app.get("/employees", async (req, res) => {
  console.log("GET: /employees called");

  var sql = `SELECT emp.employee_id as id, p.first_name, p.last_name, j.title_name
  FROM emp.employee e, emp.person p, emp.job_title j
  WHERE e.person_id=p.person_id AND e.job_title_id=j.job_title_id`;
  connection.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
      res.send("Unable to process your request.");
    }
    res.status(200);
    res.send(result);
  });
});

//This endpoint will return all users from persons from our database 'person' table
app.get("/get-all-person", async (req, res) => {
  console.log("GET: /get-all-person");

  var sql = `SELECT p.person_id as id, p.first_name, p.last_name, p.email
  FROM emp.person p`;
  connection.query(sql, function (err, result, fields) {
    if (err) {
      res.status(500);
      res.send("Unable to process your request.");
    }
    res.status(200);
    res.send(result);
  });
});

//This endpoint will add an person to the DB
app.post("/person", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  console.log(
    "POST: /person called with " +
      "FirstName=" +
      firstName +
      " LastName=" +
      lastName +
      " email=" +
      email
  );

  //very simple verification
  if (
    typeof firstName === "string" &&
    typeof lastName === "string" &&
    typeof email === "string"
  ) {
    var query = `INSERT INTO emp.person(first_name, last_name, email) VALUES (?, ?, ?);`;
    connection
      .query(query, [
        connection.escape(firstName),
        connection.escape(lastName),
        connection.escape(email),
      ])
      .then((err, result) => {
        if (err) {
          res.status(500);
          res.send("Unable to process your request.");
        }

        res.status(200);
        res.send({ msg: "Employee was added successfully!" });
      });
  } else {
    res.status(400);
    res.send({
      msg: "You passed in an incorrect format of Employee data. Please make sure you pass firstName, lastName and email. ",
    });
  }
});

//This endpoint will delete a person from person table
app.delete("/person", async (req, res) => {
  let id = parseInt(req.query.id);

  console.log("DELETE: /person called with person ID: " + id);

  //very simple verification
  if (typeof id === "number") {
    var sql = "DELETE FROM emp.person p WHERE p.person_id=?";

    connection.query(sql, [id]).then((err, result) => {
      if (err) {
        res.status(500);
        res.send("Unable to process your request.");
      }
      res.status(200);
      res.send({ msg: "Employee was deleted successfully!" });
    });
  } else {
    res.status(400);
    res.send({
      msg: "You passed in an incorrect format of Employee data. Please make sure you pass employee ID.",
    });
  }
});

app.listen(port, () => console.log("Node Server Listening on port " + port));
