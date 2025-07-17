import Canvas from "./canvas";
import Sidebar from "./sidebar";
import Header from "./header";
import { useFlowBuilder } from "../hooks/useFlowBuilder";

const Editor = () => {
  const flowBuilderHook = useFlowBuilder();

  return (
    <div className="flex flex-col h-screen">
      <Header flowBuilderHook={flowBuilderHook} />
      <div className="flex flex-1">
        <Canvas flowBuilderHook={flowBuilderHook} />
        <Sidebar flowBuilderHook={flowBuilderHook} />
      </div>
    </div>
  );
};

export default Editor;
