import useAuthStore from "../zustand/authStore";
import { Blogs } from "../components/dashboard/blogs";

export default function Dashboard() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const authData = useAuthStore((state) => state.authdata);
  
  return (
    <div>
      <h1>Welcome {authData.username}</h1>
      <Blogs/>
    </div>
  );
}
