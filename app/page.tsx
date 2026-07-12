import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import GroomBride from "@/components/sections/GroomBride";
import EventInfo from "@/components/sections/EventInfo";
import Gallery from "@/components/sections/Gallery";
import LocationMap from "@/components/sections/LocationMap";
import AccountInfo from "@/components/sections/AccountInfo";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Invitation />
      <GroomBride />
      <EventInfo />
      <Gallery />
      <LocationMap />
      <AccountInfo />
      <Contact />
    </main>
  );
}
