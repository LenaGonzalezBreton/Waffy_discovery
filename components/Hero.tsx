"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-waffy-cream">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-waffy-blue/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-waffy-pink/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 max-w-4xl px-6"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-waffy-text mb-6 tracking-tight">
                    L’Aventure d’un Chien, <br />
                    <span className="text-waffy-blue">L’Avenir de Votre Compagnon</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Découvrez comment Waffy accompagne votre chien à chaque étape de sa vie, du chiot maladroit au sage senior.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-waffy-blue text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                    Commencer l’aventure
                </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 z-10"
            >
                <ArrowDown className="w-8 h-8 text-waffy-text/50" />
            </motion.div>
        </section>
    );
}
