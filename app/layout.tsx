import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

interface Props {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  
  const header = (
    <header>
      <Link href="/">
      <div className="my-3 rounded-md bg-slate-800 p-8 text-center">
        {/* <Image
          src="/logo.png"
          width={50}
          height={50}
          className="mx-auto"
          alt={"logo"}
        /> */}
          <h1 className="mt-4 text-4xl font-bold text-white">Jack's Blog</h1>
        <p className="mt-2 text-slate-300"> 🧑‍💻 Welcome to my tech blog 🚀 </p>
      </div>
      </Link>
    </header>
  );
  
  const navbar = (
    <nav className="mb-3 rounded-md border-2 border-slate-400 py-3">
      <ul className="flex flex-wrap justify-center text-xl text-black">
        <Link href="/useful">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Useful
          </li>
        </Link>
        <Link href="/book">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Book
          </li>
        </Link>
        <Link href="/computer">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Computer
          </li>
        </Link>
        <Link href="/publication">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Publication
          </li>
        </Link>
        <Link href="/cv">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            CV
          </li>
        </Link>
      </ul>
    </nav>
  );

  const footer = (
    <footer>
      <div className="mt-12 border-t border-slate-400 py-6 text-center text-slate-400">
        <h3>Designed by Pixegami</h3>
        <p>&copy; 2024 Jack's Blog</p>
      </div>
    </footer>
  );

  return (
    <html>
      <head />
      <body>
        <div className="mx-auto max-w-screen-md px-6">
          {header}
          {navbar}
          {children}
          {footer}
        </div>
        <Analytics />
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="kkensuke" data-description="Support me on Buy me a coffee!" data-message="" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
      </body>
    </html>
  );
}
