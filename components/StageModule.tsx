"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface StageModuleProps {
    title: string;
    description: string;
    features: string[];
    color: string;
    isOpen: boolean;
    onClose: () => void;
    side?: "left" | "right"; // Position of the popup
}

export default function StageModule({
    title,
    description,
    features,
    color,
    isOpen,
    onClose,
    side = "right",
}: StageModuleProps) {
    const positionClass = side === "right" ? "right-4" : "left-4";
    const animateX = side === "right" ? { initial: 50, open: 0, closed: 50 } : { initial: -50, open: 0, closed: -50 };

    return (
        <motion.div
            initial={{ opacity: 0, x: animateX.initial, scale: 0.9 }}
            animate={isOpen ? { opacity: 1, x: animateX.open, scale: 1 } : { opacity: 0, x: animateX.closed, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${positionClass} top-1/2 -translate-y-1/2 z-50 w-80 md:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-${color}`}
            style={{ borderColor: color }}
        >
            <div className="p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>

                <h3 className="text-2xl font-bold mb-2" style={{ color }}>
                    {title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {description}
                </p>

                <div className="space-y-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${color}20` }} // 20% opacity
                            >
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button
                        className="w-full py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        style={{ backgroundColor: color }}
                    >
                        Découvrir
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
