import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import EventInfo from "@/components/sections/EventInfo";
import GroomBride from "@/components/sections/GroomBride";
import Gallery from "@/components/sections/Gallery";
import LocationMap from "@/components/sections/LocationMap";
import AccountInfo from "@/components/sections/AccountInfo";
import Contact from "@/components/sections/Contact";
import ShareFooter from "@/components/sections/ShareFooter";

// 루트 레이아웃이 Supabase에서 site_settings(꽃잎 on/off 등)를 매 요청마다 읽어와서
// 관리자 페이지에서 바꾸면 재배포 없이 바로 반영되도록, 이 페이지를 정적 생성하지 않는다.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Invitation />
      <EventInfo />
      <GroomBride />
      <Gallery />
      <LocationMap />
      <AccountInfo />
      <Contact />
      <ShareFooter />
    </main>
  );
}
