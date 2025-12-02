"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type LifeStage = "puppy" | "young" | "adult" | "senior";

interface DogCharacterProps {
    stage: LifeStage;
    isMoving: boolean;
}

// Map each stage to its corresponding asset file
const stageAssets: Record<LifeStage, string> = {
    puppy: "/assets/dog-puppy.png",
    young: "/assets/dog-young.png",
    adult: "/assets/dog-adult.png",
    senior: "/assets/dog-senior.png",
};

export default function DogCharacter({ stage, isMoving }: DogCharacterProps) {
    return (
        <motion.div
            className="relative w-32 h-32"
            style={{ scaleX: -1 }} // Flip horizontally
            animate={{
                y: isMoving ? [0, -8, 0] : 0, // Bobbing animation when moving
            }}
            transition={{
                y: {
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut"
                }
            }}
        >
            <Image
                src={stageAssets[stage]}
                alt={`Dog ${stage}`}
                fill
                className="object-contain"
                priority
            />
        </motion.div>
    );
}
