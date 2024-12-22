import { Player as PlayerType } from "../lib/types";
import PlayerPing from "./PlayerPing";

const Player = ({ id, name, ping }: PlayerType) => {
  return (
    <div className="flex h-10 items-center justify-between overflow-hidden rounded bg-muted pr-4 text-zinc-300">
      <div className="flex h-full w-full items-center divide-x divide-white/5">
        <span className="flex aspect-square size-full h-full w-fit items-center justify-center text-xs">{id}</span>
        <span className="flex h-full items-center pl-2 text-sm">{name}</span>
      </div>

      <PlayerPing ping={ping} threshold={90} />
    </div>
  );
};

export default Player;
