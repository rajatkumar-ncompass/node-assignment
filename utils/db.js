const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "db1",
});

const connectionPromise = connection.promise();

async function executeQuery(query) {
  let y;
  await connectionPromise.query(query).then((response) => {
    y = response;
  });
  return y;
}

module.exports = {
  executeQuery,
  connectionPromise,
};
