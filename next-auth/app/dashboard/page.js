import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div className="text-center">
      <h3 className="text-lg">{`Welcome ${session.user.name} 👋`}</h3>
      <h4 className="text-md">Your signed in ✅</h4>
      <div className="flex items-center justify-center gap-3 mt-3">
        <Link href={"/api/auth/signout"} className="p-1 bg-red-500 rounded-lg">
          Sign out
        </Link>
        <Link
          className="p-1 bg-blue-500 rounded-lg"
          href={"/dashboard/profile"}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
