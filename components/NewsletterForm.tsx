"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-medium"
                >
                    Merci ! Vous faites partie de l'aventure Waffy. 🐶
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        required
                        className="w-full px-6 py-4 rounded-full border-2 border-waffy-blue/20 focus:border-waffy-blue focus:outline-none text-lg bg-white shadow-sm transition-all"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="absolute right-2 top-2 bottom-2 bg-waffy-blue text-white px-6 rounded-full font-bold hover:bg-blue-400 transition-colors flex items-center gap-2 disabled:opacity-70"
                    >
                        {status === "loading" ? (
                            <span className="animate-spin">⏳</span>
                        ) : (
                            <>
                                Rejoindre <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
