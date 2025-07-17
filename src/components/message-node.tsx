import { Handle, Position } from "@xyflow/react";
import { MessageSquareText } from "lucide-react";

interface MessageNodeProps {
  data: {
    text: string;
  };
  selected?: boolean;
}

const MessageNode = ({ data, selected }: MessageNodeProps) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${
        selected ? "border-blue-500" : "border-gray-200"
      } min-w-[150px]`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />

      <div className="flex items-center space-x-2">
        <MessageSquareText className="w-4 h-4 text-gray-500" />
        <div className="text-sm text-gray-700 font-medium">Send Message</div>
      </div>

      <div className="mt-2 text-xs text-gray-600 break-words">{data.text}</div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default MessageNode;
