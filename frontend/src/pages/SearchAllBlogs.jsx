import axios from "axios";
import { useState,useEffect,createContext } from "react";
import Tags from "./Tags";
import useAuthStore from "@/zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
import BlogCard from "@/components/BlogCard";
export const searchTags = createContext();
export default function SearchForBlogs(){
    const [loading,setLoading] = useState(false)
    const [addingtag,setAddingTag] = useState([])
    const [sendingtags,setSendingTags] = useState([])
    const [search123,setSearch123] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authdata = useAuthStore((state) => state.authdata);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        setSearch123(addingtag)
        console.log(addingtag,"hello")
        setLoading(true)
        if(addingtag.length===0){
            getPublicBlogsWithNoTags(authdata , setIsLoading).then((blogs) => {
                setBlogs(blogs);
                console.log(blogs)
                setLoading(false)
            });
        }
        else{
            console.log("hello",addingtag)
            getPublicBlogsWithTags(authdata,setIsLoading,addingtag).then((blogs)=>{
                setBlogs(blogs)
                setLoading(false)
                console.log(addingtag)
            })
        }
    },[addingtag,sendingtags])
    if(loading){
        return(
            <>Loading</>
        )
    }
    return(<div className="flex">
        <div>
            <searchTags.Provider value={{search123,setAddingTag}}>
                <Tags />
            </searchTags.Provider>
        </div>
        <div>
            {addingtag.length===0?<h1>Recently Added</h1>:<div><h1>Search Based on Tags</h1>{addingtag.map((tag)=>{
                return(<h1>{tag.tagname}</h1>)
            })}</div>}
            {blogs.map((blog)=>{return<BlogCard key={blog.id} blog={blog} />})}    
        </div>
    </div>)
}

async function getPublicBlogsWithNoTags(authdata,setLoading){
    const response = await axios.post("http://localhost:5000/noTags",{});
    console.log(response.rows);
    return response.data.rows;
}
async function getPublicBlogsWithTags(authdata,setLoading,addingtag){
    const tags1 = await Promise.all(addingtag.map(async (tag) => {
        return tag.id; 
    }));
    const response = await axios.post("http://localhost:5000/withTags",{tags1});
    console.log(response.data.rows,tags1);
    return response.data.rows;
}