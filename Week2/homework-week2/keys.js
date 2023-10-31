const mysql = require('mysql');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&',
  database: 'authors',
});

connection.connect();


const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT primary key,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM ('male', 'female')
  );
`;

const addMentorColumn = `
   ALTER TABLE authors
   ADD COLUMN mentor INT,
   ADD CONSTRAINT fk_mentor
   FOREIGN KEY (mentor) REFERENCES authors(author_id);
`;

const numAuthors = 15;
const authors = [];
let nextAuthorId = 1;
for (let i = 1; i <= numAuthors; i++) {
  authors.push([
    i,
    faker.name.findName(),
    faker.company.companyName(),
    faker.date.between('1960-01-01', '1994-12-31').toISOString().split('T')[0],
    faker.random.number({ min: 1, max: 50 }),
    faker.random.arrayElement(['male', 'female']),
  ]);
  nextAuthorId++;
}

const insertAuthorsQuery = `
  INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender)
  VALUES ?;
`;

connection.query(createAuthorsTable, (error, results) => {
    if (error) {
        console.error('error creating the authors table:', error)
    } else {
        console.log('Authors table has been creating successfully!');
        connection.query(insertAuthorsQuery, [authors], (error, results) => {
            if (error) {
                console.error('error inserting authors data:', error)
            } else {
                console.log('authors data inserted successfully!');
                connection.query(addMentorColumn, (error, results) => {
                    if (error) {
                        console.error('error adding the mentor column:', error)
                    } else {
                        console.log('mentor column has been added successfully!');
                        connection.end();
                    }
                });
            }
        });
    }
});

// module.exports = {
//     authors
// };