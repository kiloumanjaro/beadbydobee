import BraceletPreview from "@/components/bracelet-preview";
import { ExpandableLogo } from "@/components/expandable-logo";

export default function confirm() {
  return (
    <div className="flex flex-col h-screen relative overflow-hidden pb-28 bg-[#EFEFEF]">
      <div className="flex h-[100px]">
        <header className="flex flex-1 items-center justify-center">
          <ExpandableLogo />
        </header>
      </div>

      <main className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 overflow-hidden">
        <BraceletPreview length={25} />
      </main>
    </div>
  );
}
