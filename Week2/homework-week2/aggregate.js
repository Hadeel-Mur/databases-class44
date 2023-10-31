const mysql = require('mysql');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&',
  database: 'authors',
});

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const papersAndNumbersOfAuthors = `
  SELECT paper_title, COUNT(author_id) AS num_authors
  FROM authors_research_papers
  WHERE paper_title IS NOT NULL
  GROUP BY paper_title
`;

const sumPapersByFemaleAuthorsQuery = `
  SELECT SUM(research_papers.paper_title IS NOT NULL) AS sum_papers
  FROM authors
  LEFT JOIN authors_research_papers ON authors.author_id = authors_research_papers.author_id
  WHERE authors.gender = 'female'
`;

const averageHIndexByUniversity = `
  SELECT university, AVG(h_index) AS avg_h_index
  FROM authors
  GROUP BY university
`;

const sumOfResearchPaperOfAuthorsPerUni = `
  SELECT a.university, SUM(rp.paper_title IS NOT NULL) AS sum_papers
  FROM authors a
  LEFT JOIN authors_research_papers rp ON a.author_id = rp.author_id
  GROUP BY a.university
`;

const minAndMaxHIndexByUniversity = `
  SELECT a.university, MIN(h_index) AS MIN_h_index, MAX(h_index) AS MAX_h_index
  FROM authors a
  GROUP BY a.university
`;

(async () => {
  try {
    connection.connect();

    const results1 = await executeQuery(papersAndNumbersOfAuthors);
    console.log('Research Papers and Number of Authors per Paper:');
    console.table(results1);

    const results2 = await executeQuery(sumPapersByFemaleAuthorsQuery);
    console.log('Sum of Research Papers by Female Authors:');
    console.table(results2);

    const results3 = await executeQuery(averageHIndexByUniversity);
    console.log('Average of the h-index of all authors per university:');
    console.table(results3);

    const results4 = await executeQuery(sumOfResearchPaperOfAuthorsPerUni);
    console.log('Sum of the research papers of the authors per university:');
    console.table(results4);

    const results5 = await executeQuery(minAndMaxHIndexByUniversity);
    console.log('Minimum and maximum of the h-index of all authors per university:');
    console.table(results5);

    connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
})();
