import { useSelector } from "react-redux";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    console.log(blogs);
    

    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h3>{blog.title}</h3>
                    <p>{blog.body.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    )
}

export default Blogs;