import { checkDownvoteSQL,checkUpvoteSQL,upvoteSQL,downvoteSQL,getDownvotesSQL,getUpvotesSQL } from "../sql/queries/votes.js";

// GET /votes/checkupvote
export async function checkUpvote(connection, req, res) {
    const { user_id, blog_id } = req.query
    try {
        const [rows, fields] = await checkUpvoteSQL(connection, user_id, blog_id)
        res.status(200).json({ checkupvote: rows[0].checkupvote })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// GET /votes/checkdownvote
export async function checkDownvote(connection, req, res) {
    const { user_id, blog_id } = req.query
    try {
        const [rows, fields] = await checkDownvoteSQL(connection, user_id, blog_id)
        res.status(200).json({ checkdownvote: rows[0].checkdownvote })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// POST /votes/upvote
export async function upvote(connection, req, res) {
    const { user_id, blog_id } = req.body
    try {
        await upvoteSQL(connection, user_id, blog_id)
        res.status(200).json({ message: 'Upvoted' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// POST /votes/downvote
export async function downvote(connection, req, res) {
    const { user_id, blog_id } = req.body
    try {
        await downvoteSQL(connection, user_id, blog_id)
        res.status(200).json({ message: 'Downvoted' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// GET /votes/votecount
export async function getVotes(connection, req, res) {
    const { blog_id } = req.query
    try {
        const [rows, fields] = await getUpvotesSQL(connection, blog_id)
        const [rows2,fields2] = await getDownvotesSQL(connection, blog_id)
        res.status(200).json({ upvotes: rows[0].upvotes , downvotes: rows2[0].downvotes})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}