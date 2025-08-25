import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const ShowAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUser(state, userId));

  return <small>{`توسط ${author?.fullname ?? "نویسنده ناشناس"}`}</small>;
};

export default ShowAuthor;
