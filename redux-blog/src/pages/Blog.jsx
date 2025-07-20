import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

const Blog = () => {
    const {blogId} = useParams()

    const blog = useSelector((state) => state.blogs.find((blog) => (blog.id == blogId)))

    if(!blog)
        return (
            <p>
                پستی که دنبالش می گردی وجود نداره دوست من 😁
            </p>
        )

    return (
        <Card>
            <h3>{blog.title}</h3>
            <p>{blog.body}</p>
            <Link to={`/blogs/edit-blog/${blogId}`}>ویرایش</Link>
        </Card>
    )
}

export default Blog;