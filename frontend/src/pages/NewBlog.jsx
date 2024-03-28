import useAuthStore from "../zustand/authStore";
import { useState , useEffect,createContext } from "react";
import axios from "axios";
import useLoadStateStore from "@/zustand/loadStateStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Tags from "./Tags1";
export const searchTags = createContext();
export default function NewBLog(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [search123,setSearch123] = useState([])
    const [addingtag,setAddingTag] = useState([])
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [public1,setPublic] = useState(true)
    const [possible,setPossible] = useState(true)
    const isAuth = useAuthStore((state) => state.isAuth);
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    const authData = useAuthStore((state) => state.authdata);
    const handleChange = (event) => {
        const str = (event.target.value).trim();
        setTitle(str)
    };
    const handleChange1 = (event) => {
        const str = (event.target.value).trim();
        setContent(str)
    };
    const handleChange2 = () => {
        setPublic(!public1)
    };
    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault(); 
        console.log('Form submitted with data:', title,content,authData);

    };
    useEffect(()=>{
        if(addingtag.length===0){
            setPossible(false)
        }
        else{
            setPossible(true)
        }
    },[addingtag])
    if(loading)
        return(<>Loading</>)
    return(
        <div className="flex">
            <div className="px-4 py-6 md:px-6 md:py-12 lg:py-32 mx-auto">
                <searchTags.Provider value={{search123,setAddingTag}}>
                    <Tags />
                </searchTags.Provider>
            </div>
        
        <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16 lg:w-3/5 mx-auto">
            <Button onClick={()=>navigate(-1)} className=" my-6">{"< Go Back "}</Button>
            
        <div class="flex flex-col h-screen">
            <header class="sticky top-0 z-10 bg-white border-b">
                <div class="px-4 py-2 md:px-6">
                    <h1 class="text-2xl font-semibold">Create a new blog post</h1>
                </div>
            </header>
            <div class="flex-1 overflow-y-auto">
                <div class="px-4 py-6 md:px-6">
                    <div class="mx-auto prose max-w-3xl">
                        <form onSubmit={handleSubmit}>
                            <div class="space-y-6"><div>
                            <label for="title" class="sr-only">
                            Title
                            </label>
                            <input type="text" onChange={handleChange} class="flex w-full rounded-md border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-4xl font-bold tracking-tight border-0 box-shadow-none h-auto" id="title" placeholder="Title" required=""/>
                            </div>
                            <div>
                            <label for="content" class="sr-only">
                            Content
                            </label>
                            <textarea onChange={handleChange1} class="flex w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px] border-0 box-shadow-none" id="content" placeholder="Write your blog post here..."></textarea>
                            </div>
                            </div>
                            <div className="flex flex-wrap p-2 gap-2">
                                Added Tags  
                                {addingtag.length===0?"  None":addingtag.map((tag)=>{
                                    return(<h1 className="inline-block rounded-lg bg-gray-100 px-2 py-1 text-m dark:bg-gray-800">{tag.tagname}</h1>)
                                })}
                            </div>
                            <div className="flex space-x-6 p-2">
                                <div>{public1?'This Blog is Public':'This Blog is Private'}</div>
                                <button onClick={handleChange2} class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">Change</button>
                            </div>
                            <div class="border-t">
                                <div class="px-4 py-4 md:px-6 md:py-6">
                                    <div class="flex items-center justify-between">
                                        {
                                            possible?<button type ='submit' class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">Publish</button>
                                            :'Atleast one tag needs to be added'
                                        }      
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    )

}


async function InsertBlog(authdata,addingtag,title,content){
    const tags1 = await Promise.all(addingtag.map(async (tag) => {
        return tag.id; 
    }));
    const response = await axios.post("http://localhost:5000/newblog",{tags1,title,content,authdata});
    console.log(response.data.rows,tags1);
    return response.data.rows;
}