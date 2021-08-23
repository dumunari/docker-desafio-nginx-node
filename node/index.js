const express = require('express')
const app = express()
const port = 3000
const {insertName, retrieveNames, createTable} = require('./db/db');


app.get('/', async (req,res) => {
    await insertName()
    const names = await retrieveNames()

    let body = '<h1> Full Cycle </h1> <ul> ';
    names.forEach(element => {
        body = body + `<li>${element.name}</li>`
    });
    nameList = body + ' </ul>'
    res.send(body)
})

app.listen(port, async ()=> {
    await createTable();
    console.log('Rodando na porta ' + port)
})