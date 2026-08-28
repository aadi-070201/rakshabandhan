import { celebration, celebrationSubtext } from "@/data";
import { motion } from "framer-motion";
import { Heart, MoveRight } from "lucide-react";

function Screen2_Celebration({ onNext }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen px-5 py-12 text-center relative w-full"
        >

            <div className="mt-10 md:mt-0 flex flex-col items-center w-full">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="font-merienda text-[38px] md:text-6xl leading-normal tracking-tight text-[#cc181b] mb-3 will-change-transform"
                >
                    {celebration.heading}
                    <br />
                    {celebration.title}
                    {celebration.name && `, ${celebration.name}`}!
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ delay: 1, duration: 0.8 }}
                    className="flex items-center justify-center gap-3 mb-6 w-full max-w-70 will-change-transform">
                    <div className="h-px rounded-full bg-linear-to-r from-transparent to-[#FFB6B9] grow"></div>
                    <Heart size={20} className="text-[#cc181b] fill-accent-red" />
                    <div className="h-px rounded-full bg-linear-to-l from-transparent to-[#FFB6B9] grow"></div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8, }}
                    className="text-primary text-lg md:text-xl font-semibold mb-4 mx-auto leading-relaxed text-balance max-w-60 will-change-transform">
                    {celebrationSubtext}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
                className="flex flex-col items-center justify-center relative mb-6 will-change-transform">
                <div className="relative mb-10 w-[170%] min-[500px]:w-200">
                    <img src="/stickers/cute-rakhi.avif" alt="rakhi" className="-rotate-16 sm:-rotate-12" />
                </div>
                <div className="absolute -right-2 bottom-5 min-[500px]:right-40">
                    <img src="/stickers/gifts.avif" alt="gifts" className="w-28 min-[355px]:w-36 min-[500px]:w-50" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 0.8, }}
                className="w-full flex justify-center will-change-transform">
                <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={onNext}
                    className="bg-linear-to-r from-accent-red to-[#FF8A8A] text-white font-medium md:text-lg py-4 px-8 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center gap-2 will-change-transform"
                >
                    Continue <MoveRight size={18} />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Screen2_Celebration