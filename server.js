const express = require("express");
const { exec } = require("child_process");
const app = express();

app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout);
  });
});

app.get("/read", (req, res) => {
  const fs = require("fs");
  res.send(fs.readFileSync("/data/" + req.query.name));
});

module.exports = app;
