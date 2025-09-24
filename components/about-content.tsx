"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
    <div className="flex-col flex items-center">
      <div className="w-[700] pt-4 h-screen flex flex-col gap-8 items-center justify-center">
        <div className="px-6 pb-3 bg-white rounded-xl shadow-sm">
          <Image
            src="/logo.jpeg"
            alt="Description of image"
            width={160}
            height={106}
          />
        </div>
        <span className="w-2xs font-base text-[#323232] text-center">
          <span>beadbydobee</span> is a custom keychain and bracelet business
          based in cebu
        </span>
      </div>
    </div>
  );
}
