"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import DogCharacter from "./DogCharacter";
import StageModule from "./StageModule";

const stages = [
    {
        id: "puppy",
        title: "Étape 1 — Chiot",
        description: "Tout commence ici. Les premiers pas, les premières découvertes.",
        features: ["Dossier santé", "Identification (puce, ICAD)", "Poids & taille", "Premiers vaccins"],
        color: "#A0E7E5",
        progressTrigger: 0.15,
        side: "right" as const,
    },
    {
        id: "young",
        title: "Étape 2 — Jeune chien",
        description: "Apprendre, comprendre, grandir. L'énergie débordante !",
        features: ["Éducation", "Socialisation", "Système d’amis", "Communauté"],
        color: "#FBE7C6",
        progressTrigger: 0.40,
        side: "left" as const,
    },
    {
        id: "adult",
        title: "Étape 3 — Adulte",
        description: "Vivre longtemps, vivre heureux. La force de l'âge.",
        features: ["Scan d’ordonnances", "Rappels médicaments", "Export vétérinaire", "Pathologies"],
        color: "#B4F8C8",
        progressTrigger: 0.65,
        side: "left" as const,
    },
    {
        id: "senior",
        title: "Étape 4 — Senior",
        description: "Accompagner jusqu’au bout avec douceur et amour.",
        features: ["Suivi santé avancé", "Pathologies chroniques", "Routines bien-être"],
        color: "#FFAEBC",
        progressTrigger: 0.90,
        side: "right" as const,
    },
];

export default function GameBoard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const [currentStage, setCurrentStage] = useState<"puppy" | "young" | "adult" | "senior">("puppy");
    const [activeModule, setActiveModule] = useState<number | null>(null);

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest < 0.25) setCurrentStage("puppy");
        else if (latest < 0.5) setCurrentStage("young");
        else if (latest < 0.75) setCurrentStage("adult");
        else setCurrentStage("senior");

        // Force close at the very end to avoid overlapping with Contact section
        if (latest > 0.98) {
            setActiveModule(null);
            return;
        }

        const triggerIndex = stages.findIndex(s => Math.abs(latest - s.progressTrigger) < 0.05);
        if (triggerIndex !== -1 && activeModule !== triggerIndex) {
            setActiveModule(triggerIndex);
        } else if (triggerIndex === -1 && activeModule !== null) {
            // Optional: Auto-close when moving away? 
            // Let's keep it open until manually closed or far away.
            if (activeModule !== null && Math.abs(latest - stages[activeModule].progressTrigger) > 0.1) {
                setActiveModule(null);
            }
        }
    });

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-waffy-cream">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Path */}
                <div className="absolute inset-0 w-full h-full opacity-50">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* White base path */}
                        <path
                            d="M 50 -10 C 50 10, 20 20, 20 35 C 20 50, 80 50, 80 65 C 80 80, 50 90, 50 110"
                            fill="none"
                            stroke="white"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Dashed colored path */}
                        <path
                            d="M 50 -10 C 50 10, 20 20, 20 35 C 20 50, 80 50, 80 65 C 80 80, 50 90, 50 110"
                            fill="none"
                            stroke="#FBE7C6"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="2 2"
                        />
                    </svg>
                </div>

                {/* Decor */}
                <div className="absolute top-[15%] left-[10%] text-6xl opacity-80">🌳</div>
                <div className="absolute top-[35%] right-[15%] text-6xl opacity-80">🌲</div>
                <div className="absolute top-[60%] left-[15%] text-6xl opacity-80">🍄</div>
                <div className="absolute top-[85%] right-[10%] text-6xl opacity-80">🏡</div>

                {/* Dog */}
                <DogPositioner progress={smoothProgress} stage={currentStage} />

                {/* Module Popup */}
                {activeModule !== null && (
                    <StageModule
                        {...stages[activeModule]}
                        isOpen={true}
                        onClose={() => setActiveModule(null)}
                    />
                )}

                {/* Progress Bar */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 h-48 w-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full bg-waffy-blue"
                        style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>
            </div>
        </div>
    );
}

function DogPositioner({ progress, stage }: { progress: any, stage: any }) {
    // Interpolate X position based on the S-curve logic
    // Path: Center -> Left -> Right -> Center
    // 0 -> 0.35 (Left) -> 0.65 (Right) -> 1.0 (Center)

    const x = useTransform(progress,
        [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        ["50%", "35%", "20%", "50%", "80%", "65%", "50%"]
    );

    const y = useTransform(progress, [0, 1], ["0%", "100%"]);

    // Determine rotation/flip based on direction
    // 0-0.35: Moving Left (Rotate slightly left or flip)
    // 0.35-0.65: Moving Right
    // 0.65-1.0: Moving Left

    const scaleX = useTransform(progress,
        [0, 0.34, 0.36, 0.64, 0.66, 1],
        [1, 1, -1, -1, 1, 1]
    );

    return (
        <motion.div
            className="absolute z-20"
            style={{
                left: x,
                top: y,
                x: "-50%",
                y: "-50%",
                scaleX: scaleX
            }}
        >
            <DogCharacter stage={stage} isMoving={true} />
        </motion.div>
    );
}
