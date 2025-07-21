import { useSelector } from "react-redux";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { allBlogsSelector } from "../features/blogSlice"

const Blogs = () => {
    const blogs = useSelector((state) => allBlogsSelector(state))

    console.log(blogs);


    return (
        <div style={{ padding: 10 }}>
            <Link style={{ padding: 20 }} to={'/blogs/create-blog'}>ایجاد بلاگ جدید</Link>
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
        </div>
    )
}

export default Blogs;