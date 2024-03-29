import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DashBlogCard({ blog }) {
  const date = new Date(blog.publishedAt);
  const navigate = useNavigate();
  const handleSubmit = async (event,blog_id) => {
    try{
        const res = await DeleteBlog(blog_id)
        alert('Blog Deleted');
        window.location.reload()

    }catch(err){
            console.log(err)
    }

  };

  return (
    <div className="border space-y-4 p-3">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{blog.title}</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {date.toDateString()}
        </p>
      </div>
      <p>{blog.content + '...'}</p>
      <div className="mt-4">
        <Link className="text-base font-medium underline" to={`/blog/${blog.id}`}>
          Read full article
        </Link>
      </div>
      <button onClick={(event)=>{handleSubmit(event,blog.id)}} className="bg-slate-900 hover:bg-gray-700 text-white font-bold py-2 text-sm px-1 rounded mt-4">Delete</button>
    </div>
  );
}


async function DeleteBlog(blog_id){
  const resp = await axios.post("http://localhost:5000/DeleteBlog",{blog_id});
  return resp
}