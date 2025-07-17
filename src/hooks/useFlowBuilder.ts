import { useCallback, useState } from "react";
import { addEdge, useNodesState, useEdgesState } from "@xyflow/react";
import type { Node, Edge, Connection } from "@xyflow/react";

export interface FlowNode extends Node {
  data: {
    text: string;
    [key: string]: any;
  };
}

export const useFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (position: { x: number; y: number }) => {
      const newNode: FlowNode = {
        id: `node-${Date.now()}`,
        type: "messageNode",
        position,
        data: { text: "New Message" },
      };
      setNodes((nds) => [...nds, newNode]);
      setSelectedNodeId(newNode.id);
    },
    [setNodes]
  );

  const updateNodeText = useCallback(
    (nodeId: string, text: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, text } } : node
        )
      );
    },
    [setNodes]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const getSelectedNode = useCallback(() => {
    return nodes.find((node) => node.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  const validateFlow = useCallback(() => {
    // Rule: Show error if there are more than one Nodes and more than one Node has empty target handles
    if (nodes.length <= 1) {
      return { isValid: true, error: "" };
    }

    // Find nodes that have no incoming edges (empty target handles)
    const nodesWithEmptyTargets = nodes.filter((node) => {
      const hasIncomingEdge = edges.some((edge) => edge.target === node.id);
      return !hasIncomingEdge;
    });

    // Check if more than one node has empty target handles
    if (nodesWithEmptyTargets.length > 1) {
      return {
        isValid: false,
        error: `Cannot save: ${nodesWithEmptyTargets.length} nodes have no incoming connections. Only one node can be without a target handle.`,
      };
    }

    return { isValid: true, error: "" };
  }, [nodes, edges]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeText,
    onNodeClick,
    selectedNodeId,
    getSelectedNode,
    validateFlow,
  };
};
