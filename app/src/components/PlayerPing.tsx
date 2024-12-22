import { FaWifi } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";
import { cn } from "../lib/utils";

const getConnectionStatus = (ms: number, threshold: number) => {
  return ms < threshold ? "good" : "bad";
};

const PlayerPing = ({ ping }: { ping: number }) => {
  const connectionStatus = getConnectionStatus(ping, 90);

  return (
    <div className="mt-1 flex">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger tabIndex={-1}>
            <FaWifi
              className={cn("rotate-45", {
                "fill-red-500": connectionStatus === "bad",
                "fill-emerald-500": connectionStatus === "good",
              })}
            />
          </TooltipTrigger>

          <TooltipContent>
            <p className="text-xs font-semibold">
              {ping} <span className="text-xxs font-light">MS</span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PlayerPing;
