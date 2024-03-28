import axios from "axios";
import { searchTags } from "./SearchAllBlogs";
import { useState,useEffect,useContext } from "react";
export default function Tags(){
    
    const { search123, setAddingTag } = useContext(searchTags);
    const [loading,setLoading] = useState(false)
    const [alltags,setAllTags] = useState([])
    const [search,setSearch] = useState("")
    const [resulttags,setResultTags] = useState([])
    const [addingtags,setAddingTags] = useState(new Set(search123))
    const [perfectMatch,setPerfectMatch] =useState(false)
    const handleChange = (event) => {
        const str = (event.target.value).trim();
        if(str.length>3){
            setSearch(str)
        }
        else{
            setSearch("")
        }
    };
    function handleRemove(tag){
        setLoading(true)
        const newset = new Set(addingtags)
        newset.delete(tag)
        setAddingTags(newset)
        setLoading(false)
    };
    function handleAdding(id){
        setLoading(true)
        setAddingTags(previousState => new Set([...previousState, id]))
        setLoading(false)
    };
    const createTag = async() => {
        setLoading(true);
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/addtag', {tag_name:search})
        const data = res.data
        const rows1 = data["rows"][0]
        handleAdding(rows1)
        setAllTags([...alltags,rows1])
        setSearch("")
        setLoading(false)
    };

    useEffect(()=>{
        setLoading(true)
        const getBloggs = async()=>{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/alltags');
            const data = res.data
            const rows1 = data["rows"]
            const rows2 = [];
            const makeArray = async(rows1)=>{
                for(let i=0;i<rows1.length;i++){
                    rows2.push(rows1[i])
                }
                setAllTags(rows2)
            }
            await makeArray(rows1)
        }
        getBloggs()
        setLoading(false)
    },[]);
    useEffect(()=>{
        setAddingTags(new Set(search123))
        console.log(search123,addingtags)
    },[search123])
    useEffect(()=>{
        setLoading(true)
        setPerfectMatch(false)
        if(search === ""){
            setResultTags([])
        }
        else{
            const flag = 0;
            const results = alltags.filter((s)=> s["tagname"].includes(search))
            setResultTags(results)
            results.map((tag)=>{
                if(tag.tagname===search){
                    setPerfectMatch(true)
                }
            })
        }
        setLoading(false)
    },[search])
    if(loading){
        return(
            <>Loading</>
        )
    }
    return(<>
        <input type = "text" placeholder="Search tag..." onChange={handleChange}/>
        {
            perfectMatch? <h1>Cant create tag exists</h1>:search.length>3?<button onClick={createTag}>Create New Tag</button>:<h1>Tag too small</h1>
        }
        <h1>Results</h1>
        {resulttags.map((tag)=>{
            if(addingtags.has(tag)===false){
                if(tag.tagname===search){
                    return(
                        <div>
                            <h1>{tag.tagname} Perfect Match</h1>
                            <button onClick={()=>handleAdding(tag)}>Add</button>
                        </div>
                    )
                }
                else{
                    return(
                        <div>
                            <h1>{tag.tagname}</h1>
                            <button onClick={()=>handleAdding(tag)}>Add</button>
                        </div>
                    )
                }
                
            }
        })}


        <h1>Adding</h1>
        <div>
        {[...addingtags].map((tag) => {
            return (
                <div>
                    <h1 key={tag.id}>{tag.tagname}</h1>
                    <button onClick={()=>handleRemove(tag)}>Remove</button>
                </div>
            );
        })}
        </div>
        <button onClick={()=>{console.log(addingtags,"hi");setAddingTag(Array.from(addingtags));}}>Apply Tags</button>
    </>)
}
