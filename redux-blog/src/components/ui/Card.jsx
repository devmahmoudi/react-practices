const Card = ({ children }) => {
  return (
    <div
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 10,
        border: "1px black solid",
      }}
    >
      {children}
    </div>
  );
};

export { Card };
