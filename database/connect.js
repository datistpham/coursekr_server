const mysql = require('mysql2/promise');


  const connection = mysql.createPool({
    host: '151.106.124.151',
    user: 'u291392387_root17',
    password: 'Chubeanxoi1!',
    database: 'u291392387_coursewebkr'
  });
  

module.exports = connection;
