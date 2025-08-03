import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogSelector, blogUpdated, modifyBlog } from "../../features/blogSlice";

const EditBlog = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => blogSelector(state, blogId));

  if (!blog) return <p>پستی که دنبالش می گردی وجود نداره دوست من 😁</p>;

  const [data, setData] = useState({
    title: blog.title,
    body: blog.body,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title && data.body) {
      const finalData = { id: blogId, title: data.title, body: data.body }

      finalData.reactions = {
        "thumbsUp": 0,
        "hooray": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
      }

      dispatch(modifyBlog(finalData));

      navigate("/blogs");
    }
  };

  return (
    <>
      <h3>ویرایش بلاگ</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="title">عنوان :</label>
          <input
            name="title"
            type="text"
            id="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="body">متن :</label>
          <textarea
            name="body"
            id="body"
            rows={15}
            onChange={handleChange}
            value={data.body}
          ></textarea>
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
    </>
  );
};

export default EditBlog;
