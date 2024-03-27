export async function createNewUserSQL(connection, username, password) {
    return await connection.query(
        `INSERT INTO users 
        (username, password) VALUES 
        ('${username}', '${password}')`,
    )
}

export async function getUserSQL(connection, username, password) {
    return await connection.query(
        `SELECT * FROM users 
        WHERE username = '${username}' AND password = '${password}'`
    )
}

// get userdetials and follower count and following count in one query
export async function getUserDetailsSQL(connection, userId) {
    return await connection.query(
        `SELECT u.id AS user_id,u.username,u.bio,
            (
                SELECT COUNT(*) 
                FROM follows 
                WHERE user_id = u.id
            ) AS followers_count,
            (
                SELECT COUNT(*) 
                FROM follows 
                WHERE follower_id = u.id
            ) AS following_count
        FROM users u
        WHERE u.id = ${userId}`
    )
}