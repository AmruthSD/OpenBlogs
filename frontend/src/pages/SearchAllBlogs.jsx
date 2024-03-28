import axios from "axios";
import { useState,useEffect,createContext } from "react";
import Tags from "./Tags";
import useAuthStore from "@/zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
export const searchTags = createContext();
export default function SearchForBlogs(){
    const [loading,setLoading] = useState(false)
    const [addingtag,setAddingTag] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authdata = useAuthStore((state) => state.authdata);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        setLoading(true)
        if(addingtag.length===0){
            getPublicBlogsWithNoTags(authdata , setIsLoading).then((blogs) => {
                setBlogs(blogs);
                console.log(blogs)
                setLoading(false)
            });
        }
        else{
            
        }
    },[addingtag])
    if(loading){
        return(
            <>Loading</>
        )
    }
    return(<>
        <h1>Hi</h1>
        <searchTags.Provider value={{addingtag,setAddingTag}}>
            <Tags />
        </searchTags.Provider>
    </>)
}

async function getPublicBlogsWithNoTags(authdata,setLoading){
    const response = await axios.post("http://localhost:5000/noTags",{});
    console.log(response.rows);
    return response.data.rows;
}