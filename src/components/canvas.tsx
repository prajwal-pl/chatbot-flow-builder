import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import MessageNode from "./message-node";
import { useFlowBuilder } from "../hooks/useFlowBuilder";

const nodeTypes = {
  messageNode: MessageNode,
};

interface CanvasProps {
  flowBuilderHook: ReturnType<typeof useFlowBuilder>;
}

const Canvas = ({ flowBuilderHook }: CanvasProps) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    onNodeClick,
  } = flowBuilderHook;

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = (event.target as Element)
        .closest(".react-flow")
        ?.getBoundingClientRect();

      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData("application/reactflow");

      if (type === "messageNode") {
        const position = {
          x: event.clientX - reactFlowBounds.left - 75,
          y: event.clientY - reactFlowBounds.top - 50,
        };

        addNode(position);
      }
    },
    [addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
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
