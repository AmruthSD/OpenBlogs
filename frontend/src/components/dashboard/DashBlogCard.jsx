import { Link } from "react-router-dom";

export default function DashBlogCard({ blog }) {
  const date = new Date(blog.publishedAt);

  return (
    <div className="space-y-4">
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
    </div>
  );
}
