"use client";

import Image from "next/image";
import { useRef } from "react";

type AboutContentProps = {
  onPress: () => void;
};

export default function AboutContent({ onPress }: AboutContentProps) {
  return (
    <div className="flex-col flex items-center">
      <div className="w-[700] h-screen flex flex-col gap-8 items-center justify-center">
        <div className="px-6 pb-3 bg-white rounded-xl shadow-sm">
          <Image
            src="/logo.jpeg"
            alt="Description of image"
            width={160}
            height={106}
          />
        </div>
        <span className="w-2xs text-[#323232] text-lg text-center">
          <span className="font-semibold">beadbydobee</span> is a custom
          keychain and bracelet business
        </span>

        <button
          onClick={onPress}
          className="px-6 py-2 bg-white text-sm font-medium text-[#323232] rounded-full shadow-sm"
        >
          See More
        </button>
      </div>
    </div>
  );
}
