export async function createNewBlogSQL(connection,user_id, title, content, isPublic) {
    return await connection.query(
        `INSERT INTO blogs(user_id,title, content, isPublic )
        VALUES 
        ('${user_id}','${title}', '${content}','${isPublic}')`,
    )
}

