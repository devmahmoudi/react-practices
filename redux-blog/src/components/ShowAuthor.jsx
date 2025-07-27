import { useSelector } from "react-redux";
import { userSelector } from "../features/userSlice";

const ShowAuthor = ({ userId }) => {
  const author = useSelector((state) => userSelector(state, userId));

  return <small>{`توسط ${author?.fullname ?? "نویسنده ناشناس"}`}</small>;
};

export default ShowAuthor;
