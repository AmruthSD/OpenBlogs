import { createNewUserSQL , getUserSQL } from "../sql/queries/user.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// POST /users/signup
export async function signUpUser(connection , req , res) {
    const { username , password } = req.body
    try{
        const [rows , fields] = await getUserSQL(connection, username)
        if(rows.length > 0) {
            return res.status(400).json({message : 'Username already exists'})
        }
        await createNewUserSQL(connection, username, password)
        const [rows2 , fields2] = await getUserSQL(connection, username , password)
        const userinfo = rows2[0]
        const tokenpayload = {
            id : userinfo.id,
            username : userinfo.username
        }
        const token = jwt.sign(tokenpayload , process.env.JWT_SECRET , {expiresIn : '10d'})
        res.status(200).json({authtoken : token, id : userinfo.id , username : userinfo.username})
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}


// POST /users/login
export async function loginUser(connection , req , res) {
    const { username , password } = req.body
    try{
        const [rows , fields] = await getUserSQL(connection, username , password)
        if(rows.length === 0) {
            return res.status(401).json({message : 'Unauthorized'})
        }
        const userinfo = rows[0]
        const tokenpayload = {
            id : userinfo.id,
            username : userinfo.username
        }
        const token = jwt.sign(tokenpayload , process.env.JWT_SECRET , {expiresIn : '10d'})
        res.status(200).json({authtoken : token, id : userinfo.id , username : userinfo.username})
    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function authmiddleware(req , res , next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if(!token) {
        return res.status(401).json({message : 'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({message : 'Unauthorized'})
        }
        next()
    } catch(err) {
        return res.status(401).json({message : 'Unauthorized'})
    }
}