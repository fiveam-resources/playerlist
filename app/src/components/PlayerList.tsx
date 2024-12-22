import { useState } from "react";

import SearchInput from "./ui/SearchInput";
import { filterPlayers } from "../lib/utils";
import { Player as PlayerType } from "../lib/types";
import Player from "./Player";

interface PlayerListProps {
  players?: PlayerType[];
  serverName?: string;
}

const PlayerList = ({ players = [], serverName = "Server Name" }: PlayerListProps) => {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const handleSearch = (query: string) => {
    setFilteredPlayers(filterPlayers(players, query));
  };

  return (
    <div className="mt-6 flex h-fit max-h-[70vh] w-full max-w-7xl flex-col overflow-hidden rounded bg-background shadow-2xl shadow-black/50">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/5 px-4">
        <h1 className="font-medium">{serverName}</h1>
      </header>

      <div className="scroller grid h-full min-h-[40vh] grid-cols-1 place-content-start gap-1.5 overflow-x-auto p-2 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPlayers.map((player) => (
          <Player key={player.id} {...player} />
        ))}
      </div>

      <footer className="flex h-10 shrink-0 items-center justify-between border-t border-white/5 pl-2 pr-4 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <SearchInput onChange={handleSearch} />
          <p>
            {players.length} {players.length === 1 ? "Player" : "Players"} Connected
          </p>
        </div>
        <span className="text-zinc-600">5AM Resources</span>
      </footer>
    </div>
  );
};

export default PlayerList;
