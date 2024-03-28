export async function upvote(connection, user_id,  blog_id) {
    return await connection.query(
        `insert into upvotes values (${user_id},${blog_id});`
    )
}

export async function downvote(connection, user_id,  blog_id) {
    return await connection.query(
        `insert into downvotes values (${user_id},${blog_id});`
    )
}