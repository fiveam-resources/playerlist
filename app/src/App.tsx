import { useState } from "react";
import { motion } from "motion/react";
import PlayerList from "./components/PlayerList";
import { useEventListener } from "usehooks-ts";
import { fetchNui } from "./lib/utils";

// const mockPlayers = Array.from({ length: 120 }, (_, index) => ({
//   id: index,
//   name: `Player ${index + 1}`,
//   ping: Math.floor(Math.random() * 100),
// }));

const ANIMATION_DURATION = 0.3;

const App = () => {
  const [open, setOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [players, setPlayers] = useState();
  const [closeKey, setCloseKey] = useState();
  const [serverName, setServerName] = useState();

  useEventListener("message", (event) => {
    const { action, data } = event.data;

    if (action === "open") {
      setPlayers(data.players);
      setAnimateOpen(true);
      setOpen(true);
      setCloseKey(data.key);
      setServerName(data.serverName);
    }

    if (action === "close") {
      setAnimateOpen(false);
      setTimeout(() => {
        setOpen(false);
      }, ANIMATION_DURATION * 1000);
    }
  });

  useEventListener("keydown", ({ code }: KeyboardEvent) => {
    if (["Escape", closeKey].includes(code)) fetchNui("close");
  });

  if (!open) return null;

  return (
    <div className="font-poppins flex h-screen select-none justify-center overflow-hidden px-2 text-white">
      <motion.div
        className="flex h-fit w-full justify-center"
        initial={{ y: "-100%" }}
        animate={{
          y: animateOpen ? 0 : "-100%",
          transition: { duration: ANIMATION_DURATION, ease: "circIn" },
        }}
      >
        <PlayerList players={players} serverName={serverName} />
      </motion.div>
    </div>
  );
};

export default App;
