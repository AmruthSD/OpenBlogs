export async function getFriends(connection,user_id){
    return await connection.query(
        `
            select users.username,users.id from users,friends where users.id = friends.user2 and friends.user1 = ${user_id};
        `
    ) 
}

export async function getRequests(connection,user_id){
    return await connection.query(
        `
            select users.id,users.username from requests,users where requests.touser=${user_id} and users.id=requests.fromuser;
        `
    ) 
}

export async function getMyRequests(connection,user_id){
    return await connection.query(
        `
            select users.id,users.username from requests,users where requests.fromuser=${user_id} and users.id=requests.touser;
        `
    ) 
}