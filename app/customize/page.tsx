import { ExpandableLogo } from "@/components/expandable-logo";
import BeadsEditor from "@/components/beads-editor";

export default function customize() {
  return (
    <div className="flex flex-col h-screen pb-28 bg-[#EFEFEF]">
      <div className="flex h-[100px]">
        <header className="flex flex-1 items-center justify-center">
          <ExpandableLogo />
        </header>
      </div>

      <main className="flex flex-1 flex-col gap-7 items-center justify-center">
        <p className="w-72 text-center text-[#323232]">
          Click and choose the beads of your choice to complete your bracelet
        </p>
        <BeadsEditor length={20} />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-lg flex items-center justify-center bg-[#8AB5D5] hover:bg-[#383838] text-white font-semibold text-sm h-10 px-10"
            href={"/confirm"}
          >
            Create
          </a>
        </div>
      </main>
    </div>
  );
}
