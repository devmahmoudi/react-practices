import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto text-center grid gap-3 py-4">
      <h1 className="text-4xl">Quiz App</h1>
      <div className="row mt-3">
        <Link href="/quiz" className="bg-white text-black px-4 py-2 rounded-md">
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
