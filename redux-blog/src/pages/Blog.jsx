import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import ShowAuthor from "../components/ShowAuthor";
import ShowDate from "../components/ShowDate";
import { Link } from "react-router-dom";
import { blogDeleted, blogSelector, destoryBlog } from "../features/blogSlice";
import { userSelector } from "../features/userSlice";
import ActionButtons from "../components/ActionButtons";

const Blog = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => blogSelector(state, blogId));

  const author = useSelector((state) => userSelector(state, blog.userId));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(destoryBlog(blogId));

    navigate("/blogs");
  };

  if (!blog) return <p>پستی که دنبالش می گردی وجود نداره دوست من 😁</p>;

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
