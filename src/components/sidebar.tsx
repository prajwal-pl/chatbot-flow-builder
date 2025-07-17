import NodeCard from "./node-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Settings from "./settings";
import { useFlowBuilder } from "../hooks/useFlowBuilder";

interface SidebarProps {
  flowBuilderHook: ReturnType<typeof useFlowBuilder>;
}

const Sidebar = ({ flowBuilderHook }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-50 h-full p-4">
      <Tabs defaultValue="nodes" className="w-full">
        <TabsList>
          <TabsTrigger value="nodes">Nodes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="nodes">
          <NodeCard />
        </TabsContent>
        <TabsContent value="settings">
          <Settings flowBuilderHook={flowBuilderHook} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
