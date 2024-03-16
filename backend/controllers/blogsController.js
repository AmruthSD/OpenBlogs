import { createNewUserSQL , getUserSQL } from "../sql/queries/createBlog.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Post/blog/newblog

export async function createNewBlog(connection , req , res) {
    const { user_id,title, content, isPublic, publishedAt } = req.body
    try{

        await createNewBlog(connection, user_id, title, content, isPublic, publishedAt)
       
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}