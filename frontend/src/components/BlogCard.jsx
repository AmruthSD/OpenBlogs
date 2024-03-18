/********** DATA FORMAT FOR NOW***********/ 
// {
// content: "this is my sukna content";
// id: 3;
// publishedAt: "2024-03-18T07:19:12.000Z";
// title: "my sukuna blog";
// user_id: 2;
// username: "sukuna";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { CircleUserRound , Calendar} from "lucide-react";

export default function BlogCard({ blog }) {
  const date = new Date(blog.publishedAt);
  const trimmedContent = blog.content.substring(0, 100);
  return (
    <div className=" hover:-translate-y-2 duration-100 ">
      <Card className=" p-4 mx-4">
        <CardHeader className="text-2xl ">{blog.title}</CardHeader>
        <CardBody className=" text-gray-600">{trimmedContent}...</CardBody>
        <CardFooter className="flex flex-row gap-2 justify-between">
          <div className="flex flex-row gap-2">
            <CircleUserRound className=" text-blue-400" />
            {blog.username} 
          </div>
            <span className=" text-gray-500 flex flex-row gap-2"><Calendar/>{date.toDateString()}</span>
        </CardFooter>
      </Card>
    </div>
  );
}
