export async function createNewBlog(connection,user_id, title, content, isPublic, publishedAt) {
    return await connection.query(
        `INSERT INTO blogs(user_id,title, content, isPublic, publishedAt )
        VALUES 
        ('${user_id}','${title}', '${content}','${isPublic}','${publishedAt}')`,
    )
}

