"use client";

import { memo } from "react";
import ModelViewer from "@/components/ModelViewer";
import { ExpandableLogo } from "@/components/expandable-logo";
import Image from "next/image";

import Dock from "@/components/Dock";

const SOCIAL_ITEMS = [
  {
    icon: (
      <Image
        src="/socials/facebook.svg"
        alt="Facebook"
        width={15}
        height={15}
      />
    ),
    label: "Facebook",
    onClick: () =>
      window.open("https://www.facebook.com/krishna.baranggot", "_blank"),
  },
  {
    icon: <Image src="/socials/mail.svg" alt="Mail" width={32} height={32} />,
    label: "Email",
    onClick: () =>
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=beadbydobee@gmail.com",
        "_blank"
      ),
  },
  {
    icon: (
      <Image
        src="/socials/instagram.svg"
        alt="Instagram"
        width={30}
        height={30}
      />
    ),
    label: "Instagram",
    onClick: () =>
      window.open("https://www.instagram.com/beadbydobee", "_blank"),
  },
];

const Contact = memo(function Contact() {
  return (
    <div
      className="relative h-[100dvh] overflow-hidden overscroll-none bg-cover bg-bottom"
      style={{
        backgroundImage: "url('/grass.webp')",
      }}
    >
      <header className="absolute top-0 w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={false} />
      </header>

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <ModelViewer
          url="/models/babi.glb"
          width={700}
          height={700}
          defaultRotationX={0}
          defaultRotationY={0}
          autoRotate
          showScreenshotButton={false}
          enableManualZoom={false}
          autoFrame
        />
      </div>

      <Dock
        items={SOCIAL_ITEMS}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
});

export default Contact;
