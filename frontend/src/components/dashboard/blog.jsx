import React,{useEffect,useState} from "react";
import axios from "axios";

export default function Content({id}){
    const bid = id
    console.log(bid)
    const [loading,setLoading] = useState(false)
    const [rows,setRows] = useState([])
    useEffect(()=>{
        setLoading(true)
        const getContent = async()=>{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/dashboard/blog', {
                blog_id: bid,
            });
            console.log(res)
            const data = res.data
            const rows1 = data["rows"]
            setRows(rows1[0])
        }
        getContent()
        setLoading(false)
    },[bid])
    if(loading){
        return (<>loading</>)
    }
    return(
        <>
        <div >
        <div>{rows["title"]}</div>
        <div>Content {rows["content"]}</div>
        <div>Upvotes {rows["u"]}</div>
        <div>Downvotes {rows["d"]}</div>
        <div>Date {rows["publishedAt"]}</div>
        </div>
        </>
    )
}