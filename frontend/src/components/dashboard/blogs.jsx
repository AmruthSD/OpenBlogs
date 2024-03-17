import axios from "axios";
import { useState, useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import ContentModal from "./modalcontent";
import Content from "./blog";
export function Blogs() {
  const authData = useAuthStore((state) => state.authdata);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [blogid, setBlogid] = useState(0);
  useEffect(() => {
    setLoading(true);
    const getBloggs = async () => {
      console.log(authData.token);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/dashboard",
        {
          user_id: authData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      const data = res.data;
      const rows1 = data["rows"];
      const rows2 = [];
      const makeArray = async (rows1) => {
        for (let i = 0; i < rows1.length; i++) {
          rows2.push(rows1[i]);
        }
        setRows(rows2);
      };
      await makeArray(rows1);
    };
    getBloggs();
    setLoading(false);
  }, []);
  if (loading) {
    return <>loading</>;
  } else {
    return (
      <>
        <h1>Your Blogs</h1>
        <div className="flex flex-col">
          {rows.map((blog) => {
            return (
              <div className="border-2 p-4">
                <h1>Title :{blog["title"]}</h1>
                <h1>Public :{blog["isPublic"]}</h1>
                <h1>Date :{blog["publishedAt"]}</h1>
                <button
                  onClick={() => {
                    setOpen(true);
                    setBlogid(blog["id"]);
                  }}
                >
                  open
                </button>
              </div>
            );
          })}
        </div>
        <ContentModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Content id={blogid} />
        </ContentModal>
      </>
    );
  }
}
