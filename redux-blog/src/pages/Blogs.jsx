import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import {
  allBlogsSelector,
  blogSliceErrorSelector,
  blogSliceStatusSelector,
} from "../features/blogSlice";
import ShowDate from "../components/ShowDate";
import ShowAuthor from "../components/ShowAuthor";
import ActionButtons from "../components/ActionButtons";
import { useEffect } from "react";
import { fetchBlogs } from "../features/blogSlice";
import Spinner from "../components/ui/Spinner";

const Blogs = () => {
  const blogSliceStatus = useSelector((state) =>
    blogSliceStatusSelector(state)
  );

  const blogSliceError = useSelector((state) => blogSliceErrorSelector(state));

  const blogs = useSelector((state) => allBlogsSelector(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogSliceStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogSliceStatus, dispatch]);

  console.log(blogSliceStatus);

  if (blogSliceStatus === "loading") {
    return <Spinner />;
  }

  if (blogSliceStatus === "error") {
    return <p style={{ textAlign: "center" }}>{blogSliceError}</p>;
  }

  if (blogSliceStatus === "success") {
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
