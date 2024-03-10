import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
import { signUpUser , loginUser , authmiddleware } from './controllers/userControllers.js'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
})

/************** USER ROUTES *****************/ 
app.post('/users/signup', async (req, res) => {
    await signUpUser(connection, req, res)
})
app.post('/users/login', async (req, res) => {
    await loginUser(connection, req, res)
})
app.get('/users/authmiddleware', authmiddleware, (req, res) => {
    res.status(200).json({message : 'Authorized'})
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})