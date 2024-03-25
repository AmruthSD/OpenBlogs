import useAuthStore from "../zustand/authStore";
import { useState, useEffect } from "react";
import axios from "axios";
// import BlogCard from "../components/BlogCard";
import useLoadStateStore from "../zustand/loadStateStore";
// import SelectTags from "../components/SelectTags";

export default function Home() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const authdata = useAuthStore((state) => state.authdata);
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [blogs, setBlogs] = useState([]);

  // Fetching blogs from the server
  useEffect(() => {
    if (isAuth) {
      setIsLoading(true);
      fetchAllBlogs(authdata).then((blogs) => {
        setBlogs(blogs);
      });
      setIsLoading(false);
    }
  }, [isAuth]);

  return (
    <>

    </>
  //   <div className="flex flex-row flex-wrap mt-6">
  //     <div className=" max-w-96 m-4">
  //       <SelectTags />
  //     </div>
  //     <div className=" flex flex-col gap-4 flex-grow-[4]">
  //       {blogs?.map((blog) => (
  //         <BlogCard key={blog.id} blog={blog} />
  //       ))}
  //     </div>
  //   </div>
  )

}

/*********** Helper functions ****************/
// Fetching blogs from the server
async function fetchAllBlogs(authdata) {
  try {
    const response = await axios.get("http://localhost:5000/blog/allblogs", {
      params: {
        userId: authdata.id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.blogs);
    return response.data.blogs;
  } catch (err) {
    alert("Error fetching blogs");
    console.log(err);
  }
}
