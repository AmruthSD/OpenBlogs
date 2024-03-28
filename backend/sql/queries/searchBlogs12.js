export async function blogsNoTags(connection) {
    return await connection.query(
        `
        SELECT *FROM blogs where isPublic = 1 order by publishedAt limit 0,10`
    )
}