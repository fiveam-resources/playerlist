import PlayerCard, { Player } from "./PlayerCard";

interface PlayerListProps {
  players: Player[];
}

const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <div className="mt-2 flex h-fit max-h-[70vh] w-full max-w-7xl flex-col overflow-hidden rounded-sm bg-zinc-950">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <h1 className="font-medium">Players List</h1>
      </header>

      <div className="scroller grid h-full grid-cols-1 gap-1 overflow-x-auto p-2 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-white/5 px-4 text-xs text-zinc-500">
        <span>
          {players.length} {players.length === 1 ? "Player" : "Players"} Online
        </span>

        {/* Please don't remove this, it's a way to support the this project and future once */}
        <span className="text-zinc-900">5AM Resources</span>
      </footer>
    </div>
  );
};

export default PlayerList;
