import Canvas from "./canvas";
import Sidebar from "./sidebar";

const Editor = () => {
  return (
    <div className="flex h-screen">
      <Canvas />
      <Sidebar />
    </div>
  );
};

export default Editor;
