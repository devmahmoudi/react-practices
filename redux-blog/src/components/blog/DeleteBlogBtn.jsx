import { useEffect } from "react";
import { useDestroyBlogMutation } from "../../api/blogApi";
import Spinner from "../ui/Spinner";

const DeleteBlogBtn = ({ blogId, onDeleted }) => {
  const [deleteBlog, { isLoading, isError, isSuccess, error }] =
    useDestroyBlogMutation();

  const handleDelete = async () => {
    await deleteBlog(blogId);
  };

  // Navigate after delete
  useEffect(() => {
    if (isSuccess) {
      onDeleted();
    }
  }, [isSuccess]);

  // Display error message
  useEffect(() => {
    if (isError) alert(error);
  }, [isError, error]);

  return (
    <button
      className="button"
      style={{ marginLeft: 20 }}
      onClick={handleDelete}
    >
      {isLoading ? <Spinner /> : <span>حذف</span>}
    </button>
  );
};

export default DeleteBlogBtn;
