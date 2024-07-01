import React,{useEffect,useState} from "react";
import axios from "axios";
import useAuthStore from "@/zustand/authStore";
import useLoadStateStore from "@/zustand/loadStateStore";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Friends(){
    const navigate = useNavigate()
    const [friends,setFriends] = useState([])
    const [requests,setRequests] = useState([])
    const [myRequests,setMyRequests] = useState([])
    const isAuth = useAuthStore((state) => state.isAuth);
    const authData = useAuthStore((state)=>state.authdata)
    const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
    
    useEffect(()=>{
        setIsLoading(true);
        const getFriendsData = async() =>{
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/friends",
                {
                  user_id: authData.id,
                }
              );
              const data = res.data;
              setFriends(data.friends)
              setRequests(data.requests)
              setMyRequests(data.myRequests)
        }
        try {
            getFriendsData();
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    },[])
    
    return(
        <>
            <div className="px-4 py-6 w-full flex">
                <div className="grow">
                    <div>My Friends</div>
                    <div className="flex-col">
                        { 
                            friends.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="grow flex-col">
                    <div className="">
                        <div>My Requests</div>
                        <div className="flex-col">
                        { 
                            myRequests.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link><Button>Remove</Button></div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="">
                        <div>Requests</div>
                        <div className="flex-col">
                        { 
                            requests.map((e,i)=>{
                                return(
                                    <div><Link to={`/writers/${e.id}`} key={e.id}>{e.username}</Link>
                                    <Button>Remove</Button>
                                    <Button>Accept</Button>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}