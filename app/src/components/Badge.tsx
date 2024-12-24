import { FaCrown } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { PiPlantFill, PiShootingStarFill } from "react-icons/pi";
import { RiShieldFlashFill } from "react-icons/ri";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/Tooltip";
import { MemberType } from "../lib/types";

const MemberBadge = ({ type }: { type?: MemberType }) => {
  const badge = {
    owner: {
      label: "Server Owner",
      icon: <FaCrown className="fill-yellow-500" />,
    },
    admin: {
      label: "Admin",
      icon: <RiShieldFlashFill className="fill-orange-400" />,
    },
    moderator: {
      label: "Moderator",
      icon: <RiShieldFlashFill className="fill-blue-500" />,
    },
    verified: {
      label: "Verified",
      icon: <BsPatchCheckFill className="fill-sky-500 p-px" />,
    },
    new: {
      label: "New",
      icon: <PiPlantFill className="fill-green-500" />,
    },
    supporter: {
      label: "Supporter",
      icon: <PiShootingStarFill className="fill-pink-500" />,
    },
  };

  if (!type) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger tabIndex={-1}>
          <div className="flex size-6 items-center justify-center p-0.5">{badge[type].icon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs font-semibold">{badge[type].label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { MemberBadge };
