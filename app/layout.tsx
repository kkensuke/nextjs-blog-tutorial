import Link from "next/link";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react"
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head />
      <body>
        <Header />
        <div className="mx-auto min-h-[93vh] max-w-screen-md px-6">
          <Navbar />
          {children}
        </div>
        <Footer />
        <Analytics />
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="kkensuke" data-description="Support me on Buy me a coffee!" data-message="" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
      </body>
    </html>
  );
}
