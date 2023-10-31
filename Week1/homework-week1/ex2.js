const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'Hadeel',
    password : 'Hadeel1994@@@&',
    database : 'world',
});

connection.connect();

const countryPopulation = 'SELECT name FROM country WHERE population > 8000000'
const countryNameLikeLand = "SELECT name FROM country WHERE name LIKE '%land%'"
const cityPopulation = 'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000'
const countryContinentEurope = 'SELECT name FROM country WHERE continent = "Europe"'
const countryBYSurfacearea = 'SELECT name FROM country ORDER BY surfacearea DESC'
const countryCode = 'SELECT name FROM city WHERE countrycode = "NLD"'
const populationCity = 'SELECT population FROM city WHERE name = "Rotterdam"'
const countryOrderdBySurfacearea = 'SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10'
const cityNameByPopulation = 'SELECT name FROM city ORDER BY population DESC LIMIT 10'
const sumWorldPopulation = 'SELECT SUM(population) AS world_population FROM country '

connection.query(countryPopulation, (error, results) => {
    if(error) throw error;
    console.log('Query 1 :', results)
});

connection.query(countryNameLikeLand, (error, results) => {
    if(error) throw error;
    console.log('Query 2 :', results)
});

connection.query(cityPopulation, (error, results) => {
    if(error) throw error;
    console.log('Query 3 :', results)
});

connection.query(countryContinentEurope, (error, results) => {
    if(error) throw error;
    console.log('Query 4 :', results)
});

connection.query(countryBYSurfacearea, (error, results) => {
    if(error) throw error;
    console.log('Query 5 :', results)
});

connection.query(countryCode, (error, results) => {
    if(error) throw error;
    console.log('Query 6 :', results)
});

connection.query(populationCity, (error, results) => {
    if(error) throw error;
    console.log('Query 7 :', results)
});

connection.query(countryOrderdBySurfacearea, (error, results) => {
    if(error) throw error;
    console.log('Query 8 :', results)
});

connection.query(cityNameByPopulation, (error, results) => {
    if(error) throw error;
    console.log('Query 9 :', results)
});

connection.query(sumWorldPopulation, (error, results) => {
    if(error) throw error;
    console.log('Query 10 :', results)
});