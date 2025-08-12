import BraceletPreview from "@/components/bracelet-preview";
import { ExpandableSocialCard } from "@/components/expandable-card";

export default function confirm() {
  return (
    <div className="pt-5 h-screen overflow-hidden relative bg-[#EFEFEF] flex flex-col gap-28">
      <div className="flex justify-center">
        <ExpandableSocialCard />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 overflow-hidden">
        <BraceletPreview length={25} />
      </div>

      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-bold text-black">Your bracelet</span>
          <p className="w-72 text-center text-[#323232]">
            Click and choose the beads of your choice to complete your bracelet
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-lg flex items-center justify-center bg-[#8AB5D5] hover:bg-[#383838] text-white font-semibold text-sm h-10 px-10"
            href={"/customize"}
          >
            Create
          </a>
        </div>
      </main>
    </div>
  );
}
