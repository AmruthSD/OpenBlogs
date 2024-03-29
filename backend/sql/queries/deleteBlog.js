export async function deleteBlog1(connection, blog_id) {
    return await connection.query(
        `
        delete from blog_tags where blog_id = ${blog_id};
        `
    )
}
export async function deleteBlog2(connection, blog_id) {
    return await connection.query(
        `
        
        delete from upvotes where blog_id = ${blog_id};
        
        `
    )
}
export async function deleteBlog3(connection, blog_id) {
    return await connection.query(
        `
        
        delete from downvotes where blog_id = ${blog_id};
        
        `
    )
}
export async function deleteBlog4(connection, blog_id) {
    return await connection.query(
        `
        
        delete from blogs where id = ${blog_id};
        `
    )
}