export async function getBlogs(connection, user_id) {
    return await connection.query(
        `SELECT id,title,isPublic,publishedAt FROM blogs 
        WHERE user_id = '${user_id}' order by publishedAt desc`
    )
}

export async function individualBlog(connection, blog_id) {
    return await connection.query(
        `with upvotes(u) as (select count(*) from upvotes where blog_id= ${blog_id}),
        downvotes(d) as (select count(*) from downvotes where blog_id= ${blog_id})
        SELECT *FROM blogs ,upvotes,downvotes  
        WHERE id = ${blog_id}`
    )
}