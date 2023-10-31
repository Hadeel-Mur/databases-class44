const mysql = require('mysql');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&',
  database: 'authors',
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

//   Write a query that prints names of all authors and their corresponding mentors.
const authorsAndMentors = `
  SELECT a.author_name AS author, m.author_name AS mentor
  FROM authors a
  LEFT JOIN authors m ON a.mentor_id = m.author_id;
`

// Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
const authorsAndPaperTitles = `
  SELECT authors.*, COALESCE(rp.paper_title, 'No Paper') AS paper_title
  FROM authors
  LEFT JOIN research_Papers rp ON authors.author_id = rp.author_id;
  `

connection.query(authorsAndMentors, (err, results1) => {
  if (err) throw err;

  console.log('Authors and their mentors:');
  console.table(results1);

  connection.query(authorsAndPaperTitles, (err, results2) => {
    if (err) throw err;

    console.log('Authors and their paper titles:');
    console.table(results2);
    connection.end();
  });
});
