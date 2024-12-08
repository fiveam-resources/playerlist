import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Player } from "../components/PlayerCard";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterPlayers(players: Player[], query: string) {
  return players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase()),
  );
}
