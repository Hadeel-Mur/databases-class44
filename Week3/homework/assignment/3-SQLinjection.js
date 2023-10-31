const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&', 
  database: 'database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// 1-Give an example of a value that can be passed as name and code that 
// would take advantage of SQL-injection and ( fetch all the records in the database)

function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    connection.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

const vulnerableName = "' OR '1'='1";
const vulnerableCode = "' OR '1'='1";

getPopulation("Country", vulnerableName, vulnerableCode, (err, result)=>{
    if(err){
        console.error(err);
    }else{
        console.log("Vulnerable Result:", result);
    }
});


// 2-Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulation(Country, name, code, cb){
    const query= `SELECT Population FROM ${Country} WHERE Name= ? and Code =?`
    connection.query(query, [name, code], function(err, result){
        if(err) cb(err);
        if(result.length === 0) cb(new Error("Not Found"));
        cb(null, result[0].name);
    });
}