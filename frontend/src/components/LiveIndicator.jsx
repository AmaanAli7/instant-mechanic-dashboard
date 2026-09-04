import { Wifi } from "lucide-react";

const LiveIndicator = ({ connected }) => {
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span
        className={`h-2 w-2 rounded-full ${
          connected
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      />

      <Wifi
        size={14}
        className={
          connected
            ? "text-green-600"
            : "text-red-500"
        }
      />

      <span
        className={
          connected
            ? "text-green-600"
            : "text-red-500"
        }
      >
        {connected ? "Live" : "Disconnected"}
      </span>
    </div>
  );
};

export default LiveIndicator;