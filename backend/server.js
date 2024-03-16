import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
import { signUpUser , loginUser , authmiddleware } from './controllers/userControllers.js'
import { userBlogs,indBlog } from './controllers/dashboardControllers.js'
import { createNewBlog  } from './controllers/blogsController.js'
import { allTags,addOneTag } from './controllers/tagControllers.js'
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
/*Dashboard*/
app.post('/dashboard',authmiddleware, async (req,res)=>{
    await userBlogs(connection,req,res)
})
app.post('/dashboard/blog',authmiddleware, async (req,res)=>{
    await indBlog(connection,req,res)
})

/*tags*/
app.post('/alltags', async (req,res)=>{
    await allTags(connection,req,res)
})
app.post('/addtag', async (req,res)=>{
    await addOneTag(connection,req,res)
})

//pending
app.post('/blog/newblog',authmiddleware, async (req, res) => {
    await createNewBlog(connection, req, res)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})