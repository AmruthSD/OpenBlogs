import { checkIfUserHasAcces, getCollabBlogData, updateDoc } from "../sql/queries/collabBlog.js";

export async function JoinAUser(connection,socket,data){
    const {id,user_id} = data;
    const result = {}
    try {
        
        const [rows,feild] = await checkIfUserHasAcces(connection,id,user_id);
        if(rows[0].c === 0){
            result.hasAcces = false;
            result.hasContent = false;
            result.error = false;
            socket.emit('welcome', result);
            return
        }
        result.hasAcces = true;
        result.hasContent = true;
        const [rows1,feilds1] = await getCollabBlogData(connection,id);
        result.content = rows1[0].content;
        
        result.error = false
        result.title = rows1[0].title;
        if(rows1[0].user_id===user_id){
            result.owner = true;
        }
        else{
            result.owner = false
        }
        socket.join(id);
        socket.emit('welcome', result);
        return
    } catch (error) {
        console.log(error)
        result.error = true;
        socket.emit('welcome', result);
        return
    }
}


export async function SaveDoc(connection,socket,data){
    const {id,content} = data;
    try {
        //console.log({y:JSON.stringify(content)},'hi')
        const y = JSON.stringify(content)
        updateDoc(connection,id,y)
    } catch (error) {
        console.log(error)
    }
}