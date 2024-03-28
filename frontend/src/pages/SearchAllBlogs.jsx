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
    const [search123,setSearch123] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authdata = useAuthStore((state) => state.authdata);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        setSearch123(addingtag)
        setLoading(true)
        if(addingtag.length===0){
            getPublicBlogsWithNoTags(authdata , setIsLoading).then((blogs) => {
                setBlogs(blogs);
                console.log(blogs)
                setLoading(false)
            });
        }
        else{
            const tags1 = addingtag.map((tag)=>{
                tag.id
            })
            getPublicBlogsWithTags(authdata,setIsLoading,tags1).then((blogs)=>{
                setBlogs(blogs)
                setLoading(false)
                console.log(addingtag)
            })
        }
    },[addingtag])
    if(loading){
        return(
            <>Loading</>
        )
    }
    return(<div className="flex">
        <div>
            <searchTags.Provider value={{search123,setAddingTag}}>
                {console.log(addingtag)}
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
async function getPublicBlogsWithTags(authdata,setLoading,tags1){
    const response = await axios.post("http://localhost:5000/withTags",{tags1});
    console.log(response.rows);
    return response.data.rows;
}