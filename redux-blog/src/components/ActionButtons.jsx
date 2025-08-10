import { useDispatch } from "react-redux";
import { incrementReaction } from "../features/blogSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "💖",
  rocket: "🚀",
  eyes: "👀",
};

const ActionButtons = ({ blog }) => {
  const dispatch = useDispatch();

  if(!blog) return null

  const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
    <button
        key={name}
        onClick={() => {
          dispatch(incrementReaction({blogId: blog.id, reactionName: name}));
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
