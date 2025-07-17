import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFlowBuilder } from "../hooks/useFlowBuilder";
import { useEffect, useState } from "react";

interface SettingsProps {
  flowBuilderHook: ReturnType<typeof useFlowBuilder>;
}

const Settings = ({ flowBuilderHook }: SettingsProps) => {
  const { selectedNodeId, getSelectedNode, updateNodeText } = flowBuilderHook;
  const [text, setText] = useState("");

  const selectedNode = getSelectedNode();

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || "");
    } else {
      setText("");
    }
  }, [selectedNode]);

  const handleTextChange = (value: string) => {
    setText(value);
    if (selectedNodeId) {
      updateNodeText(selectedNodeId, value);
    }
  };

  if (!selectedNode) {
    return (
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-gray-500">
          Select a node to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="node-text" className="text-sm font-semibold">
          Node Text
        </Label>
        <p className="text-xs text-gray-500 mb-2">
          Edit the text that appears in the selected node
        </p>
      </div>
      <Input
        id="node-text"
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter node text"
      />
      <div className="text-xs text-gray-400">Selected: {selectedNode.id}</div>
    </div>
  );
};

export default Settings;
