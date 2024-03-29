export async function blogsNoTags(connection) {
    return await connection.query(
        `
        SELECT b.*,u.username as username FROM blogs b,users u where u.id = b.user_id and isPublic = 1 order by publishedAt desc limit 0,10`
    )
}

export async function blogsWithTags(connection,tags) {
    return await connection.query(
        `with ids as( select distinct b1.id from blogs b1,blog_tags t1 where t1.blog_id = b1.id and t1.tag_id in (?))
        SELECT b.*,u.username as username FROM blogs b,users u,ids i where u.id = b.user_id and i.id = b.id and isPublic = 1 order by (select count(*) from upvotes u123 where u123.blog_id = b.id) desc limit 0,10
        
        `
    ,[tags])
}


export async function tagsWithTags(connection,id) {
            return await connection.query(
                `
                select t2.* from tags t2,blog_tags t3 where t2.id = t3.tag_id and t3.blog_id = ${id} order by t2.tagname
                `
            )
}

export async function blogsWithTagsAndFollowersSQL(connection, tags, userId) {
    return await connection.query(
        `WITH ids AS (
            SELECT DISTINCT b1.id
            FROM blogs b1, blog_tags t1
            WHERE t1.blog_id = b1.id
            AND t1.tag_id IN (?)
        )
        SELECT b.*, u.username AS username
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        JOIN ids i ON i.id = b.id
        LEFT JOIN follows f ON f.user_id = ? AND f.follower_id = b.user_id
        WHERE isPublic = 1
        AND (f.user_id IS NOT NULL OR b.user_id = ?)
        ORDER BY (
            SELECT COUNT(*)
            FROM upvotes u123
            WHERE u123.blog_id = b.id
        ) DESC
        `,
        [tags, userId, userId]
    );
}

export async function blogsNoTagsWithFollowsSQL(connection, userId) {
    return await connection.query(
        `
        SELECT b.*, u.username AS username
        FROM blogs b
        JOIN users u ON u.id = b.user_id
        LEFT JOIN follows f ON f.user_id = ? AND f.follower_id = b.user_id
        WHERE isPublic = 1
        AND (f.user_id IS NOT NULL OR b.user_id = ?)
        ORDER BY publishedAt DESC
        `,
        [userId, userId]
    );
}
