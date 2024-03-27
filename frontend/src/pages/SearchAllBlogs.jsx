import axios from "axios";
import { useState,useEffect,createContext } from "react";
import Tags from "./Tags";

export const searchTags = createContext();
export default function SearchForBlogs(){
    const [loading,setLoading] = useState(false)
    const [addingtag,setAddingTag] = useState([])
    const [blogs,setBlogs] = useState([])
    useEffect(()=>{
        setLoading(true)
        if(addingtag.length===0){
                
        }
        else{

        }
        setLoading(false)
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
