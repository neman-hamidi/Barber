import Link from "next/link";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/barbers"
        className="border border-gray-300 py-2 px-4 rounded-3xl bg-sky-300"
      >
        آرایشگاه ها
      </Link>
    </div>
  );
}
