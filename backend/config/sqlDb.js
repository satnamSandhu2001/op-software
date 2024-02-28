const sql = require('mssql');

const sqlConfig = {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  // database: 'test',
  password: process.env.SQL_PASSWORD,
  port: Number(process.env.SQL_PORT),
  options: {
    encrypt: false,
  },
};

let pool;

connectSqlDB = async () => {
  if (!pool) {
    pool = await sql.connect(sqlConfig);
    console.log('sql server connected....');
  }
  return pool;
};

module.exports = connectSqlDB;
