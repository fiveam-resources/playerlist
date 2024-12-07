import PlayerList from "./components/PlayerList";

const mockPlayers = Array.from({ length: 128 }, (_, index) => ({
  id: index,
  name: `Player ${index + 1}`,
  tag: "tag",
  ping: Math.floor(Math.random() * 100),
}));

const App = () => {
  return (
    <div className="font-poppins flex h-screen justify-center overflow-hidden bg-zinc-950/70 px-2 text-white select-none">
      <PlayerList players={mockPlayers} />
    </div>
  );
};

export default App;
