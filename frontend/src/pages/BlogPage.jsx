import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bid = id;
  // console.log(bid);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getContent = async () => {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/dashboard/blog",
        {
          blog_id: bid,
        }
      );
      // console.log(res);
      const data = res.data;
      const rows1 = data["rows"];
      setRows(rows1[0]);
    };
    getContent();
    setLoading(false);
  }, [bid]);
  if (loading) {
    return <>loading</>;
  }

  const date = new Date(rows["publishedAt"]);

  return (
    <>
      <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16 lg:w-3/5 mx-auto">
        <Button onClick={()=>navigate(-1)} className=" my-6">{"< Go Back "}</Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            {rows["title"]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Posted on {date.toDateString()}
          </p>
        </div>
        <div className="prose prose-gray mx-auto not-prose py-6">
          {rows["content"]}
        </div>
        <div className="grid grid-cols-2 items-center gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Button className="h-10" variant="outline">
              Upvote
            </Button>
            <span className="text-sm font-semibold">{rows["u"]} upvotes</span>
          </div>
          <div className="flex items-center space-x-2 justify-self-end">
            <Button className="h-10" variant="outline">
              Downvote
            </Button>
            <span className="text-sm font-semibold">{rows["d"]} downvotes</span>
          </div>
        </div>
      </div>
    </>
  );
}

/**************** HELPER FUNCTION ***********************/

// get upvotes and downvotes