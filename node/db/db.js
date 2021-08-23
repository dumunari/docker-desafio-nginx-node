const mysql = require('mysql')
const util = require('util');
const { uniqueNamesGenerator, starWars } = require('unique-names-generator');

const dbConnection = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
});
const query = util.promisify(dbConnection.query).bind(dbConnection);

const namesConfig = {
    dictionaries: [starWars]
  }

exports.createTable = async function() {
    const sql = 'CREATE TABLE IF NOT EXISTS people(id int primary key auto_increment, name varchar(255))'
    await query(sql)
}

exports.insertName = async function(){
    const sql = `INSERT INTO people(name) values('${uniqueNamesGenerator(namesConfig)}')`
    await query(sql)
}

exports.retrieveNames = async function() {
    const sql = 'SELECT name FROM people';
    const names = await query(sql)
    return names
}