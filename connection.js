const colors = require("colors/safe");

const setupPostgres = (obj) => {
  // START CREATE SETUP CONNECTION
  let configConnection = {
    database: obj["cadenaconexion"]["_attributes"]["Esquema"],
    port: obj["cadenaconexion"]["_attributes"]["Puerto"],
    user: obj["cadenaconexion"]["_attributes"]["Usuario"],
    password: obj["cadenaconexion"]["_attributes"]["Contrasena"],
    host: "postgres_db",
  };
  //   console.log(colors.bgGreen("Obj Connection:", configConnection));
  return configConnection;
};

module.exports = { setupPostgres };
