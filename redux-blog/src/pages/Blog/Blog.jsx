import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import ShowAuthor from "../../components/ShowAuthor";
import ShowDate from "../../components/ShowDate";
import { Link } from "react-router-dom";
import { destoryBlog } from "../../features/blogSlice";
import { userSelector } from "../../features/userSlice";
import ActionButtons from "../../components/ActionButtons";
import { useGetBlogQuery } from "../../api/apiSlice";
import Spinner from "../../components/ui/Spinner";

const Blog = () => {
  const { blogId } = useParams();

  const {
    data: blog,
    isLoading,
    isSuccess,
    error
  } = useGetBlogQuery(blogId)

  const handleDelete = () => {
    dispatch(destoryBlog(blogId));

    navigate("/blogs");
  };

  if (!blog) return <p>پستی که دنبالش می گردی وجود نداره دوست من 😁</p>;

  if(isLoading)
    return <Spinner />;

  if(!isSuccess)
    return <p>{error}</p>

  return (
    <Card>
      <h3>{blog.title}</h3>
      <div>
        <ShowDate timestamp={blog.date} />
        <ShowAuthor userId={blog.userId} />
      </div>
      <p>{blog.body}</p>
      <ActionButtons blog={blog} />
      <button
        className="button"
        style={{ marginLeft: 20 }}
        onClick={handleDelete}
      >
        حذف
      </button>
      <Link to={`/blogs/edit-blog/${blogId}`}>ویرایش</Link>
    </Card>
  );
};

export default Blog;
