import { useState } from "react";
import { useEventListener } from "usehooks-ts";
import { fetchNui } from "./lib/utils";
import { AnimatePresence, motion } from "motion/react";
import PlayerList from "./components/PlayerList";
// import mockPlayers from "./lib/mock";

const App = () => {
  const [display, setDisplay] = useState(false);
  const [players, setPlayers] = useState();

  // config options
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
    if (display && ["Escape", closeKey].includes(code)) {
      fetchNui("close");
    }
  });

  return (
    <AnimatePresence>
      {display && (
        <motion.div
          className="font-poppins flex h-screen select-none justify-center overflow-hidden px-2 text-white"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex h-fit w-full justify-center"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "circIn" }}
          >
            <PlayerList players={players} serverName={serverName} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
