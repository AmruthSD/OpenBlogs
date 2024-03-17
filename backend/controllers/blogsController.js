import { createNewBlogSQL } from "../sql/queries/createBlog.js";

// Post /blog/newblog
export async function createNewBlog(connection , req , res) {
    const { user_id,title, content, isPublic } = req.body
    try{
        await createNewBlogSQL(connection, user_id, title, content, isPublic)
        res.status(201).json({message : 'Blog Created Successfully'})
       
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}