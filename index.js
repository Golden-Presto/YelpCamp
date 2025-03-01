const express = require('express');
const app = express(); 
const hello = "HEllo";

app.get('/', (req, res) => {
    res.send(hello)
})

app.listen('3000', () => {
    console.log('Listening on port 3000');
})