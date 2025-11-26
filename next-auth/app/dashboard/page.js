import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);

  console.log(session);

  return <h1>Welcome to your dashboard 🎉🎉🎉</h1>;
}
