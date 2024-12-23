export type MemberType = "owner" | "admin" | "moderator" | "verified" | "new" | "supporter";

export type Player = {
  id: number;
  name: string;
  ping: number;
  memberType?: MemberType;
};
