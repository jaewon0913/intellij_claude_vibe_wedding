import DevHero from "@/components/developer-theme/DevHero";
import DevReadme from "@/components/developer-theme/DevReadme";
import DevCoupleYaml from "@/components/developer-theme/DevCoupleYaml";
import DevGitLog from "@/components/developer-theme/DevGitLog";
import DevDeployCard from "@/components/developer-theme/DevDeployCard";
import DevGallery from "@/components/developer-theme/DevGallery";
import DevLocation from "@/components/developer-theme/DevLocation";
import DevAccounts from "@/components/developer-theme/DevAccounts";
import DevContact from "@/components/developer-theme/DevContact";
import DevAiGreetings from "@/components/developer-theme/DevAiGreetings";
import DevShareFooter from "@/components/developer-theme/DevShareFooter";

// site_settings(꽃잎 on/off 등)는 이 테마에서 쓰지 않지만, 갤러리/토스트 등은
// 요청마다 최신 데이터를 봐야 하므로 정적 생성을 하지 않는다.
export const dynamic = "force-dynamic";

export default function DeveloperThemePage() {
  return (
    <main className="pb-12">
      <DevHero />
      <DevReadme />
      <DevCoupleYaml />
      <DevGitLog />
      <DevDeployCard />
      <DevGallery />
      <DevLocation />
      <DevAccounts />
      <DevContact />
      <DevAiGreetings />
      <DevShareFooter />
    </main>
  );
}
