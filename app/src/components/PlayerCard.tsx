import { Player } from "../lib/types";
import PlayerPing from "./PlayerPing";

const PlayerCard = ({ id, name, ping }: Player) => {
  return (
    <div className="flex h-10 items-center justify-between rounded bg-white/5 pr-4 text-zinc-300">
      <div className="flex h-full w-full items-center space-x-2 text-sm">
        <div className="flex aspect-square size-full h-full w-fit items-center justify-center border-r border-white/5 text-xs">
          {id}
        </div>
        <span>{name}</span>
      </div>

      <PlayerPing ping={ping} />
    </div>
  );
};

export default PlayerCard;
