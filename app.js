const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

app.get("/status", (req, res) => res.json({ status: "Server is healthy ✅", uptime: process.uptime() }));


const { Queue } = require("./ds/queue");       // your Module 5 class

const jobs = new Queue();

app.post("/jobs", (req, res) => {

  if (!req.body?.task) return res.status(400).json({ error: "task required" });

  jobs.enqueue({ task: req.body.task, at: Date.now() });

  res.status(202).json({ queued: jobs.size() });

});

app.post("/jobs/next", (req, res) => {

  const job = jobs.dequeue();

  job ? res.json(job) : res.status(204).end();

});


module.exports = app;     
