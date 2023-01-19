const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  fixturesFolder: false,
  env: {
    db: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "testDB",
    },
  },
  e2e: {
    // baseUrl: "https://musicbrainz.org/doc/MusicBrainz_API",
    supportFile: false,
    setupNodeEvents(on, config) {
      on("task", {
        // destructure the argument into the individual fields
        queryDatabase(query) {
          const connectionInfo = connections.db;

          if (!connectionInfo) {
            throw new Error(`Do not have DB connection under name ${dbName}`);
          }

          return queryDB(connectionInfo, query);
        },
      });
    },
  },
});

// the connection strings for different databases could
// come from the Cypress configuration or from environment variables
const connections = {
  db: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "testDB",
  },
};

// querying the database from Node
function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo);

  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      connection.end();

      return resolve(results);
    });
  });
}
