const randomMemberType = () => {
  const types = ["owner", "admin", "moderator", "verified", "new", "supporter"] as const;
  return types[Math.floor(Math.random() * types.length)];
};

const mockPlayers = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Player ${index + 1}`,
  ping: Math.floor(Math.random() * 100),
  memberType: Math.random() > 0.1 ? randomMemberType() : undefined,
}));

export default mockPlayers;
