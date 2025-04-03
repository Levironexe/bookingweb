
import Image from "next/image";
import {Navbar, ContactForm} from "./components/index"

export default function Home() {
  return (
    <main className="bg-white w-full h-full">
      <Navbar/>
      <ContactForm/>
    </main>
  );
}

