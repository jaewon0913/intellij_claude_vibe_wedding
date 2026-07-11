import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Invitation />
    </main>
  );
}
