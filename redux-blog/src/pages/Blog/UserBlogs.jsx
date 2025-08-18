import { Card } from "../../components/ui/Card";
import { Link, useParams } from "react-router-dom";
import ShowDate from "../../components/ShowDate";
import ShowAuthor from "../../components/ShowAuthor";
import ActionButtons from "../../components/ActionButtons";
import Spinner from "../../components/ui/Spinner";
import { useGetBlogsQuery } from "../../api/apiSlice";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";

const UserBlogs = () => {
    const { userId } = useParams()

    const userBlogsSelector = useMemo(() => {
        return createSelector(
            (blogs, _) => blogs,
            (_, userId) => userId,
            (blogs, userId) => blogs?.filter(blog => blog.userId == userId) ?? []
        )
    }, [userId])

    const {
        userBlogs,
        isLoading,
        isSuccess,
        error
    } = useGetBlogsQuery(undefined, {
        selectFromResult: blogs => ({
            ...blogs,
            userBlogs: userBlogsSelector(blogs.data, userId)
        })
    })

    if (isLoading) {
        return <Spinner />;
    }

    if (!isSuccess) {
        return <p style={{ textAlign: "center" }}>{error}</p>;
    }

    // ordering blogs descending according the blog create at
    let orderBlogs = userBlogs.slice()
    orderBlogs = orderBlogs.sort((a, b) => b.date.localeCompare(a))

    if (isSuccess) {
        return (
            <div className="blogs">
                <div style={{ marginTop: 10 }}>
                    <button style={{ margin: 10 }}>
                        <Link to={"/blogs/create-blog"} style={{ padding: 15 }}>
                            ساخت پست جدید
                        </Link>
                    </button>
                </div>
                {orderBlogs.map((blog) => (
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

export default UserBlogs;
