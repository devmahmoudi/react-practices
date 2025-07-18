import { useSelector } from "react-redux";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    console.log(blogs);


    return (
        <Card>
            {blogs.map((blog) => (
                <Card key={blog.id}>
                    <h3>{blog.title}</h3>
                    <p>{blog.body.substring(0, 100)}...</p>
                    <Link to={`/blogs/${blog.id}`}>
                    مشاهده  
                    </Link>
                </Card>
            ))}
        </Card>
    )
}

export default Blogs;