import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { allBlogsSelector, blogSliceStatusSelector } from "../features/blogSlice";
import ShowDate from "../components/ShowDate";
import ShowAuthor from "../components/ShowAuthor";
import ActionButtons from "../components/ActionButtons";
import { useEffect } from "react";
import {fetchBlogs} from "../features/blogSlice"

const Blogs = () => {
  const blogSliceStatus = useSelector((state) => blogSliceStatusSelector(state))
  const dispatch = useDispatch()


  useEffect(() => {
    if(blogSliceStatus == 'idle')    
      dispatch(fetchBlogs())
  }, [blogSliceStatus, dispatch])

  let blogs = useSelector((state) => allBlogsSelector(state));

  blogs = blogs
    .slice()
    .sort((current, next) => next.date.localeCompare(current.date));

  return (
    <div style={{ padding: 10 }}>
      <Link style={{ padding: 20 }} to={"/blogs/create-blog"}>
        ایجاد بلاگ جدید
      </Link>
      <Card>
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <h3>{blog.title}</h3>
            <div style={{ marginTop: 10 }}>
              <ShowDate timestamp={blog.date} />
              <ShowAuthor userId={blog.userId} />
            </div>
            <p>{blog.body.substring(0, 100)}...</p>
            <Link to={`/blogs/${blog.id}`}>مشاهده</Link>
            <ActionButtons blog={blog} />
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default Blogs;
