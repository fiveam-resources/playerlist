import { useState } from "react";
import PlayerCard from "./PlayerCard";
import SearchInput from "./ui/SearchInput";
import { filterPlayers } from "../lib/utils";
import { Player } from "../lib/types";

const PlayerList = ({
  players = [],
  serverName,
}: {
  players?: Player[];
  serverName?: string;
}) => {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const handleSearch = (query: string) => {
    setFilteredPlayers(filterPlayers(players, query));
  };

  return (
    <div className="mt-2 flex h-screen max-h-[70vh] w-full max-w-7xl flex-col overflow-hidden rounded-md bg-zinc-950/90">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <h1 className="font-medium">{serverName || "Server Name"}</h1>
      </header>

      <div className="scroller grid h-full grid-cols-1 place-content-start gap-1 overflow-x-auto p-2 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-white/5 pl-2 pr-4 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <SearchInput onChange={handleSearch} />
          <span>
            {players.length} {players.length === 1 ? "Player" : "Players"}
            {" Online"}
          </span>
        </div>

        {/* Please don't remove this, it's a way to support the this project and future once, however if really really want to remove it, feel free to do so */}
        <span className="text-zinc-800">5AM Resources</span>
      </footer>
    </div>
  );
};

export default PlayerList;
