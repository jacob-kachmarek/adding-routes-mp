const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const app = require('.');
const fs = require('fs');

// GET Route for retrieving diagnostic information
diagnostics.get('/api/diagnostics', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.sendFile(path.join(__dirname, "./db/diagnostics.json"))
});

// POST Route for a error logging
diagnostics.post('/api/diagnostics', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const newPost = req.body
  fs.readFile("./db/diagnostics.json", "utf-8", (error, data) => {
    if (error){
      console.log(error)
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newPost);
      fs.writeFile("./db/diagnostics.json", JSON.stringify(parsedData, null), (error) => {
        if (error) {
        console.log(error)
      } else {
        res.json(parsedData);
      }
      })
    }
    
  })

});

module.exports = diagnostics;
