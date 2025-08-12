import { ExpandableSocialCard } from "@/components/expandable-card";

export default function Map() {
  return (
    <div className="grid grid-rows-[50px_1fr] items-center justify-items-center p-8 pb-20 gap-18 h-screen bg-[#EFEFEF]">
      <ExpandableSocialCard />
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center"></main>
    </div>
  );
}
