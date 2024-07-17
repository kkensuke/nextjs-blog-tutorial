import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
      <div className="my-3 rounded-md bg-cyan-500 p-8 text-center">
        {/* <Image
          src="/logo.png"
          width={50}
          height={50}
          className="mx-auto"
          alt={"logo"}
        /> */}
          <h1 className="mt-4 text-4xl font-bold text-black">Title</h1>
        <p className="mt-2 text-black"> 🧑‍💻 Welcome to my website 🚀 </p>
      </div>
      </Link>
    </header>
  );
}
