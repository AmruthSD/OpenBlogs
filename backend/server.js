import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'
const app = express()
const port = process.env.PORT || 5000

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})