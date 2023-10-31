const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Hadeel',
  password: 'Hadeel1994@@@&',
  database: 'meetup'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS meetup';
const useDatabaseQuery = 'USE meetup';
const createInviteeTableQuery = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255),
    invited_by INT
  )
`;
const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  )
`;
const createMeetingTableQuery = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )
`;

connectQuery();

function connectQuery(){
  const query = 
  `
  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Invitee 1', NULL),
    ('Invitee 2', 1),
    ('Invitee 3', 1),
    ('Invitee 4', 2),
    ('Invitee 5', 3);

  INSERT INTO Room (room_name, floor_number) VALUES
    ('Room A', 1),
    ('Room B', 2),
    ('Room C', 1),
    ('Room D', 3),
    ('Room E', 2);

  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Meeting 1', '2023-08-28 10:00:00', '2023-08-28 12:00:00', 1),
    ('Meeting 2', '2023-08-29 14:00:00', '2023-08-29 16:00:00', 2),
    ('Meeting 3', '2023-08-30 09:00:00', '2023-08-30 11:00:00', 3),
    ('Meeting 4', '2023-08-31 11:00:00', '2023-08-31 13:00:00', 4),
    ('Meeting 5', '2023-09-01 15:00:00', '2023-09-01 17:00:00', 5);
`;

connection.query(query, (err, result) => {
  if(err){
    console.error('Error executing query:', err);
    return
  } console.log('Query executed successfully:', result);
})
}

