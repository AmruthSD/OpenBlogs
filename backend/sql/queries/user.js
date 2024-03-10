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