import PlayerPing from "./PlayerPing";

export interface Player {
  id: number;
  name: string;
  tag: string;
  ping: number;
}

const PlayerCard = ({ id, name, ping }: Player) => {
  return (
    <div className="flex h-10 items-center justify-between rounded-xs bg-black/50 pr-4">
      <div className="flex h-full w-full items-center space-x-2 text-sm">
        <div className="flex aspect-square size-full h-full w-fit items-center justify-center border-r border-white/5 text-xs text-zinc-600">
          {id}
        </div>
        <span className="text-zinc-300">{name}</span>
      </div>

      <PlayerPing ping={ping} />
    </div>
  );
};

export default PlayerCard;
