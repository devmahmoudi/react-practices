import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { allUsersSelector } from "../../features/userSlice";
import { useAddNewBlogMutation } from "../../features/blogSlice"

const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    body: "",
    userId: "",
    date: "",
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  });

  const [addNewBlog, { isLoading }] = useAddNewBlogMutation()

  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  const users = useSelector((state) => allUsersSelector(state));

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title && data.body) {
      try {
        setStatus("loading");

        const blog = data

        blog.date = new Date().toISOString();

        await addNewBlog(blog).unwrap();

        navigate("/blogs");
      } catch (error) {
        console.error("Error creating blog:", error);
      } finally {
        setStatus("idle");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">عنوان :</label>
        <input name="title" type="text" id="title" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="body">متن :</label>
        <textarea
          name="body"
          id="body"
          rows={15}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="userId">نویسنده :</label>
        <select
          name="userId"
          id="userId"
          value={data.userId}
          onChange={handleChange}
        >
          <option value="">انتخاب نویسنده ✍️</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullname}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <button style={{ marginBottom: 0 }} type="submit">
          ذخیره
        </button>
        <Link
          to={"/blogs"}
          style={{
            marginTop: 0,
            marginRight: 10,
            backgroundColor: "yellow",
            padding: 7,
            borderRadius: 10,
          }}
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default CreateBlog;
