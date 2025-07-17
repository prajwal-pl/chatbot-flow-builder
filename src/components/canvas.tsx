import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const Canvas = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow>
        <Background
          // @ts-ignore
          variant="dots"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
