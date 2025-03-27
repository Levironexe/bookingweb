
import Image from "next/image";
import {Navbar} from "./components/index"
import {Booking} from "./components/index"


export default function Home() {
  return (
    <main className="bg-white w-full h-full">
      <Navbar/>
      <Booking/>
    </main>
  );
}

