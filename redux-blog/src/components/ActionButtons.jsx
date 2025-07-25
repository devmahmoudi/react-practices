import { useDispatch } from "react-redux";
import { reactionIncrement } from "../features/blogSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "💖",
  rocket: "🚀",
  eyes: "👀",
};

const ActionButtons = ({ blog }) => {
  const dispatch = useDispatch();

  const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        onClick={() => {
          dispatch(reactionIncrement({blogId: blog.id, reaction: name}));
        }}
        style={{
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        {emoji} {blog.reactions[name]}
      </button>
    );
  });

  return <div>{buttons}</div>;
};

export default ActionButtons;
