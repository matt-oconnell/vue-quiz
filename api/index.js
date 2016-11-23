const express = require('express');
const path = require('path');
const app = express();

app.get('/questions/:id', function(req, res) {
  res.sendFile(path.resolve(`src/data/${req.params.id}q.md`));
});

app.get('/explanations/:id', function(req, res) {
  res.sendFile(path.resolve(`src/data/${req.params.id}e.md`));
});

module.exports = app;
