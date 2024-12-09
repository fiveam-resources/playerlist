import { useState } from "react";
import { motion } from "motion/react";
import PlayerList from "./components/PlayerList";
import { useEventListener } from "usehooks-ts";

const mockPlayers = Array.from({ length: 120 }, (_, index) => ({
  id: index,
  name: `Player ${index + 1}`,
  ping: Math.floor(Math.random() * 100),
}));

const App = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [open, setOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const duration = 0.3;

  useEventListener("message", (event) => {
    const { action, data } = event.data;

    if (action === "open") {
      setPlayers(data.players);
      setAnimateOpen(true);
      setOpen(true);
    }

    if (action === "close") {
      setAnimateOpen((prevOpen) => !prevOpen);
      setTimeout(() => setOpen((prevOpen) => !prevOpen), duration * 1000);
    }
  });

  useEventListener("keydown", ({ code }: KeyboardEvent) => {
    if (["Escape"].includes(code)) fetchNui("close");
  });

  if (!open) return null;

  return (
    <div className="font-poppins flex h-screen select-none justify-center overflow-hidden px-2 text-white">
      <motion.div
        className="flex h-fit w-full justify-center"
        initial={{ y: "-100%" }}
        animate={{
          y: animateOpen ? 0 : "-100%",
          transition: { duration: duration, ease: "circIn" },
        }}
      >
        <PlayerList players={players} />
      </motion.div>
    </div>
  );
};

export default App;

function fetchNui(_arg0: string) {
  console.log(_arg0);
  throw new Error("Function not implemented.");
}
