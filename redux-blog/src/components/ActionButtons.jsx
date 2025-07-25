const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "💖",
  rocket: "🚀",
  eyes: "👀",
};

const ActionButtons = ({ blog }) => {
  const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        onClick={() => {}}
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
