"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="px-6 pb-3 bg-white rounded-xl shadow-sm">
        <Image
          src="/logo.jpeg"
          alt="Description of image"
          width={160}
          height={106}
        />
      </div>
      <span className="w-2xs text-[#323232] text-lg text-center">
        <span className="font-semibold">beadbydobee</span> is a custom keychain
        and bracelet business
      </span>
    </div>
  );
}
