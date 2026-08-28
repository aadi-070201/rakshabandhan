import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { message, messageEndText } from "@/data";

function Screen5_Message() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center px-8 py-12 text-center relative w-full"
        >

            <div className="mt-8 w-full flex justify-center">
                <motion.div
                    initial={{ y: 40, opacity: 0, rotateX: -10 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                    className="bg-[#fff3ec] min-h-75 md:min-h-90 md:max-h-96 max-h-83 rounded-4xl p-8 md:p-10 shadow-lg border border-accent-red w-full max-w-sm relative"
                >
                    <div className="h-full overflow-y-auto">
                        <div className="absolute -top-5 right-0  w-12 h-12 md:w-14 md:h-14 bg-[#faf2ed] rounded-full flex items-center justify-center rotate-14 z-10 border border-accent-red">
                            <Heart size={32} className="text-[#cc181b] stroke-1 fill-[#f67070]" />
                        </div>

                        <p className="text-primary md:text-lg font-medium leading-relaxed whitespace-pre-wrap">
                            {message}
                            <span className="font-bold text-lg md:text-xl mt-2 block">{messageEndText}</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}
                className="mt-6 mb-4 flex items-center justify-center"
            >
                <img src="/stickers/sibling-illustration.avif" alt="sibling" className="w-36 md:w-40" />
            </motion.div>

            <motion.h1
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
                className="font-merienda text-3xl md:text-4xl text-primary mb-3 leading-tight"
            >
                Happy<br />Raksha Bandhan!
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ delay: 1.5, duration: 0.8 }}
                className="flex items-center justify-center gap-3 mb-6 w-full max-w-70 will-change-transform">
                <div className="h-px rounded-full bg-linear-to-r from-transparent to-[#FFB6B9] grow"></div>
                <Heart size={20} className="text-[#cc181b] fill-accent-red" />
                <div className="h-px rounded-full bg-linear-to-l from-transparent to-[#FFB6B9] grow"></div>
            </motion.div>
        </motion.div>
    );
}

export default Screen5_Message