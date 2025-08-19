import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import ShowAuthor from "../../components/ShowAuthor";
import ShowDate from "../../components/ShowDate";
import { Link } from "react-router-dom";
import { userSelector } from "../../features/userSlice";
import ActionButtons from "../../components/ActionButtons";
import { useGetBlogQuery, useDestroyBlogMutation } from "../../features/blogSlice";
import Spinner from "../../components/ui/Spinner";
import DeleteBlogBtn from "../../components/blog/DeleteBlogBtn";

const Blog = () => {
  const { blogId } = useParams();

  const navigate = useNavigate()

  const {
    data: blog,
    isLoading,
    isSuccess,
    error
  } = useGetBlogQuery(blogId)

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
      <DeleteBlogBtn blogId={blog.id} onDeleted={() => navigate('/blogs')}/>
      <Link to={`/blogs/edit-blog/${blogId}`}>ویرایش</Link>
    </Card>
  );
};

export default Blog;
