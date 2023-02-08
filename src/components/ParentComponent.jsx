const ParentComponent = ({ children }) => {
  const [Sidebar, ProductBox] = children;

  return (
    <div className="flex">
      <div style={{ flex: 1 }}>{Sidebar}</div>
      <div style={{ flex: 3 }}>{ProductBox}</div>
    </div>
  );
};

export default ParentComponent;
