import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import ShowDate from "../components/ShowDate";
import ShowAuthor from "../components/ShowAuthor";
import ActionButtons from "../components/ActionButtons";
import Spinner from "../components/ui/Spinner";
import { useGetBlogsQuery } from "../api/apiSlice";

const Blogs = () => {
  const {
    data: blogs = [],
    isLoading,
    isSuccess,
    error
  } = useGetBlogsQuery()

  if (isLoading) {
    return <Spinner />;
  }

  if (!isSuccess)
  {
    return <p style={{ textAlign: "center" }}>{error}</p>;
  }

  if (isSuccess) {
    return (
      <div className="blogs">
        <div style={{ marginTop: 10 }}>
          <Link to={"/blogs/create-blog"} style={{ padding: 15 }}>
            ساخت پست جدید
          </Link>
        </div>
        {blogs.map((blog) => (
          <Card key={blog.id} className="blog">
            <h2>{blog.title}</h2>
            <ShowDate date={blog.createdAt} />
            <ShowAuthor userId={blog.userId} />
            <p>{blog.body}</p>
            <ActionButtons blog={blog} />
            <Link to={`/blogs/${blog.id}`}>مشاهده پست</Link>
          </Card>
        ))}
      </div>
    );
  }

  return <p style={{ textAlign: "center" }}>No blogs found</p>;
};

export default Blogs;
