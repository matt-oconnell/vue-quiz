const express = require('express');
const path = require('path');
const app = express();
const request = require('superagent');

app.get('/questions/:id', function(req, res) {
  res.sendFile(path.resolve(`src/data/${req.params.id}q.md`));
});

app.get('/explanations/:id', function(req, res) {
  res.sendFile(path.resolve(`src/data/${req.params.id}e.md`));
});

app.get('/test', function(req, res) {
  return request.get('http://localhost:3000/').then((data) => {
    res.send(data.text);
  })
  .catch(e => res.send(e));
});

module.exports = app;
