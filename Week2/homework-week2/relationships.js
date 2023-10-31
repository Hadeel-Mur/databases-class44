const mysql = require('mysql');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&',
  database: 'authors',
});

connection.connect();

// Create authors table
const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255)
  );
`;

// Create research papers table
const createResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT PRIMARY KEY AUTO_INCREMENT,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
  );
`;

// Create authors-research_papers relation table
const createAuthorsResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS authors_research_papers (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  );
`;

const numAuthors = 50;
const authors = [];
for (let i = 1; i <= numAuthors; i++) {
  authors.push([faker.name.findName()]);
}

const numPapers = 30;
const papers = [];
for (let i = 1; i <= numPapers; i++) {
  papers.push([faker.lorem.words(5), faker.company.companyName(), faker.date.between('2020-01-01', '2022-12-31').toISOString().split('T')[0]]);
}

// Insert data into the authors and research_papers tables
const insertAuthorsQuery = `
  INSERT INTO authors (author_name)
  VALUES ?;
`;

const insertPapersQuery = `
  INSERT INTO research_papers (paper_title, conference, publish_date)
  VALUES ?;
`;

connection.query(createAuthorsTable, (error, results) => {
  if (error) {
    console.error('Error creating the authors table:', error);
  } else {
    console.log('Authors table has been created successfully!');
    connection.query(createResearchPapersTable, (error, results) => {
      if (error) {
        console.error('Error creating the research_papers table:', error);
      } else {
        console.log('Research_Papers table has been created successfully!');
        connection.query(createAuthorsResearchPapersTable, (error, results) => {
          if (error) {
            console.error('Error creating the authors_research_papers table:', error);
          } else {
            console.log('Authors_Research_Papers table has been created successfully!');
            connection.query(insertAuthorsQuery, [authors], (error, results) => {
              if (error) {
                console.error('Error inserting authors data:', error);
              } else {
                console.log('Authors data inserted successfully!');
                connection.query(insertPapersQuery, [papers], (error, results) => {
                  if (error) {
                    console.error('Error inserting research papers data:', error);
                  } else {
                    console.log('Research papers data inserted successfully!');
                  }
                  connection.end();
                });
              }
            });
          }
        });
      }
    });
  }
});
