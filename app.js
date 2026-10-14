const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

app.get("/status", (req, res) => res.json({ status: "Server is healthy ✅", uptime: process.uptime() }));

app.post("/jobs/next", (req, res) => {

  const job = jobs.dequeue();

  job ? res.json(job) : res.status(204).end();

});


module.exports = app;     
