import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import EventInfo from "@/components/sections/EventInfo";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Invitation />
      <EventInfo />
    </main>
  );
}
