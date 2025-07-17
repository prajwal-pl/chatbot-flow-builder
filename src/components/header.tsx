import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useFlowBuilder } from "../hooks/useFlowBuilder";
import { useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  flowBuilderHook: ReturnType<typeof useFlowBuilder>;
}

const Header = ({ flowBuilderHook }: HeaderProps) => {
  const { nodes, edges, validateFlow } = flowBuilderHook;
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Validate the flow according to the rule
      const validation = validateFlow();
      
      if (!validation.isValid) {
        toast.error(validation.error, {
          description: "Please fix the flow before saving.",
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
        return;
      }

      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Flow saved successfully!", {
        description: `Saved ${nodes.length} nodes and ${edges.length} connections.`,
      });
    } catch (error) {
      toast.error("Failed to save flow", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Chatbot Flow Builder</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{nodes.length} nodes</span>
            <span>•</span>
            <span>{edges.length} connections</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
