"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const initialCards = cardsData.length
    ? cardsData.slice(0, 3)
    : [
        {
          id: 1,
          img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        },
        {
          id: 2,
          img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        },
        {
          id: 3,
          img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        },
      ];

  const [cards, setCards] = useState(initialCards);

  // Create a mapping of card ID to fixed visual position (0=left, 1=center, 2=right)
  const cardPositions = new Map(initialCards.map((card, index) => [card.id, index]));

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        // Get the fixed visual position for this card ID (0=left, 1=center, 2=right)
        const fixedPosition = cardPositions.get(card.id) ?? 0;
        // Calculate position from center: -1 (left), 0 (center), 1 (right)
        const positionFromCenter = fixedPosition - 1;
        // Rotation: left card rotates left (-12°), center stays flat (0°), right rotates right (12°)
        const rotation = positionFromCenter * 12 + randomRotate;
        // Horizontal offset: spread cards apart horizontally
        const horizontalOffset = positionFromCenter * 80;
        // Z-index based on current order (for proper stacking when dragging)
        const zIndex = cards.length - index;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: rotation,
                x: horizontalOffset,
                scale: fixedPosition === 1 ? 1 : 0.95, // Middle card slightly larger
                zIndex: zIndex,
                transformOrigin: "center center",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
