export async function blogsNoTags(connection) {
    return await connection.query(
        `
        SELECT b.*,u.username as username FROM blogs b,users u where u.id = b.user_id and isPublic = 1 order by publishedAt desc limit 0,10`
    )
}

export async function blogsWithTags(connection,tags) {
    return await connection.query(
        `
        SELECT b.*,u.username as username FROM blogs b,users u,blog_tags t where u.id = b.user_id and isPublic = 1 and t.blog_id = b.id and t.tag_id in (?) order by publishedAt desc limit 0,10`
    ,[tags])
}