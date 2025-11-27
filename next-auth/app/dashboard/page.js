import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div>
      <h3 className="text-lg">{`Welcome ${session.user.name} 👋`}</h3>
      <h4 className="text-md">Your signed in ✅</h4>
      <Link
        href={"/api/auth/signout"}
        className="p-1 bg-red-500 rounded-lg mt-3"
      >
        Sign out
      </Link>
    </div>
  );
}
