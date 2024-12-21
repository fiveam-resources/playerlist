import { useState } from "react";
import PlayerList from "./components/PlayerList";
import { useEventListener } from "usehooks-ts";
import { fetchNui } from "./lib/utils";
import { AnimatePresence, motion } from "motion/react";

const App = () => {
  const [display, setDisplay] = useState(true);
  const [players, setPlayers] = useState();
  const [closeKey, setCloseKey] = useState();
  const [serverName, setServerName] = useState();

  useEventListener("message", (event) => {
    const { action, data } = event.data;

    if (action === "open") {
      setPlayers(data.players);
      setDisplay(true);
      setCloseKey(data.key);
      setServerName(data.serverName);
    }

    if (action === "close") {
      setDisplay(false);
    }
  });

  useEventListener("keydown", ({ code }: KeyboardEvent) => {
    if (display && ["Escape", closeKey].includes(code)) fetchNui("close");
  });

  return (
    <AnimatePresence>
      {display && (
        <div className="font-poppins flex h-screen select-none justify-center overflow-hidden px-2 text-white">
          <motion.div
            className="flex h-fit w-full justify-center"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "circIn" }}
          >
            <PlayerList players={players} serverName={serverName} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
