import useAuthStore from "../zustand/authStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashBlogCard from "@/components/dashboard/DashBlogCard";
import useLoadStateStore from "@/zustand/loadStateStore";
import axios from "axios";

export default function WriterDashboard() {
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const isAuth = useAuthStore((state) => state.isAuth);
  const authData = useAuthStore((state) => state.authdata);
  const [writerDetails, setWriterDetails] = useState({});
  const [blogCount, setBlogCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const { writerId } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res1 = await getWriterDetails(writerId, authData);
      if (res1) {
        console.log(res1);
        setWriterDetails(res1);
      }
      const res2 = await getWritersBlogs(writerId, authData);
      if (res2) {
        console.log(res2);
        setBlogs(res2);
        setBlogCount(res2.length);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
          {writerDetails?.username}
        </h1>
        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <p className="font-semibold">{writerDetails?.followers_count}</p>
          <p className="font-semibold">Followers</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{writerDetails?.following_count}</p>
          <p className="font-semibold">Following</p>
          <span className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <p className="font-semibold">{blogCount}</p>
          <p className="font-semibold">Blogs</p>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-800" />
      <div className="grid gap-6 pt-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <DashBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

// get writer's details from the server
export async function getWriterDetails(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/users/details",
      {
        params: {
          userId: writerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.userdetails[0];
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}

//  get writer's blog and data from the server
export async function getWritersBlogs(writerId, authData) {
  try {
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/writers/blogs",
      {
        params: {
          writerId: writerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    return res.data.blogs;
  } catch (error) {
    console.log(error);
    alert("Error fetching data");
    return null;
  }
}
