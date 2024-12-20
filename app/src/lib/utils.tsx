import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Player } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterPlayers(players: Player[], query: string) {
  return players.filter((player) =>
    player.name.toLowerCase().includes(query.toLowerCase()),
  );
}

export async function fetchNui(eventName: string, data?: unknown) {
  const resourceName = "playerlist";

  return new Promise((resolve, reject) => {
    fetch(`https://${resourceName}/${eventName}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}
