import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { blogDeleted, blogSelector } from "../features/blogSlice"

const Blog = () => {
    const { blogId } = useParams()

    const blog = useSelector((state) => blogSelector(state, blogId))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(blogDeleted({id: blogId}))

        navigate('/blogs')
    }

    if (!blog)
        return (
            <p>
                پستی که دنبالش می گردی وجود نداره دوست من 😁
            </p>
        )

    return (
        <Card>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
            <button className="button" style={{marginLeft: 20}} onClick={handleDelete}>
                حذف
            </button>
            <Link to={`/blogs/edit-blog/${blogId}`}>ویرایش</Link>
        </Card>
    )
}

export default Blog;