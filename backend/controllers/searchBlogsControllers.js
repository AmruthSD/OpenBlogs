import {blogsNoTags} from "../sql/queries/searchBlogs12.js"
import { blogsWithTags } from "../sql/queries/searchBlogs12.js";

export async function BlogsNoTags(connection , req , res){
    try{
        const [rows , fields] = await blogsNoTags(connection)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function BlogsWithTags(connection,req,res){
    const {tags} = req.body
    try{
        const [rows , fields] = await blogsWithTags(connection,tags)
        res.status(200).json({rows : rows})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}