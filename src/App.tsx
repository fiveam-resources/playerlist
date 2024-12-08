import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PlayerList from "./components/PlayerList";

const mockPlayers = Array.from({ length: 128 }, (_, index) => ({
  id: index,
  name: `Player ${index + 1}`,
  tag: "tag",
  ping: Math.floor(Math.random() * 100),
}));

const App = () => {
  const [open, setOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const duration = 0.3;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAnimateOpen((prevOpen) => !prevOpen);
        setTimeout(() => setOpen((prevOpen) => !prevOpen), duration * 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="font-poppins flex h-screen justify-center overflow-hidden px-2 text-white select-none">
      <motion.div
        className="flex h-fit w-full justify-center"
        initial={{ y: "-100%" }}
        animate={{
          y: animateOpen ? 0 : "-100%",
          transition: { duration: duration, ease: "circIn" },
        }}
      >
        <PlayerList players={mockPlayers} />
      </motion.div>
    </div>
  );
};

export default App;
