"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="mt-8 px-6 py-1 bg-white rounded-xl shadow-sm">
        <Image
          src="/logo.jpeg" // image must be in /public folder
          alt="Description of image"
          width={143}
          height={95}
        />
      </div>
      <span className="text-[#323232] text-xl w-xs text-center">
        <span className="font-semibold">beadbydobee</span> is a custom keychain
        and bracelet business
      </span>
    </div>
  );
}
