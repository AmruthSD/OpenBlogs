import { getFriends,getRequests,getMyRequests } from "../sql/queries/friends.js";

export async function FriendsData(connection,req,res){
    const user_id = req.body.user_id;
    try {
        const [rows,fields] = await getFriends(connection,user_id)
        const [rows1,fields1] = await getRequests(connection,user_id)
        const [rows2,fields2] = await getMyRequests(connection,user_id)
        res.status(200).json({friends:rows,requests:rows1,myRequests:rows2})
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}