import { MessageSquareText } from "lucide-react";

const NodeCard = () => {
  return (
    <div
      draggable
      className="flex flex-col items-center space-x-2 p-2 py-3 bg-white rounded shadow hover:bg-gray-100 cursor-grab"
    >
      <MessageSquareText className="w-6 h-6 text-gray-500" />
      <span className="text-sm text-gray-700">Message</span>
    </div>
  );
};

export default NodeCard;
