import Image from "next/image";
import {Navbar, Hero} from "./components/index"

export default function Home() {
  return (
    <main className="bg-white w-full h-full">
      <Navbar/>
      <Hero/>
    </main>
  );
}
