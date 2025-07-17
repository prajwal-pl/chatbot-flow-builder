import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Settings = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor="settings-input" className="text-sm font-semibold">
        Text
      </Label>
      <Input id="settings-input" placeholder="Enter text" />
    </div>
  );
};

export default Settings;
