// RUN THIS INDEPENDENTLY

import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'ICode@247'
})
