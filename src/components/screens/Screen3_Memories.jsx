import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Heart, LayoutGrid } from "lucide-react";
import { memoriesHeading, memoriesSubext, photos } from "@/data";

function Screen3_Memories({ onNext }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onNext();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const visiblePhotos = photos.slice(currentIndex).slice(0, 3).map((photo, index) => ({
        url: photo,
        originalIndex: currentIndex + index,
        stackIndex: index
    })).reverse();

    return (
        <motion.div
            className="flex flex-col items-center justify-center px-5 py-12 text-center relative w-full overflow-hidden"
        >

            <div className="mt-8 mb-8 w-full flex flex-col items-center">
                <h2 className="font-merienda text-4xl md:text-5xl text-primary mb-3">{memoriesHeading}</h2>
                <motion.div
                    className="flex items-center justify-center gap-3 mb-3 w-full max-w-70 will-change-transform">
                    <div className="h-px rounded-full bg-linear-to-r from-transparent to-[#FFB6B9] grow"></div>
                    <Heart size={20} className="text-[#cc181b] fill-accent-red" />
                    <div className="h-px rounded-full bg-linear-to-l from-transparent to-[#FFB6B9] grow"></div>
                </motion.div>
                <p className=" text-[#8b6b6d] text-lg md:text-xl">
                    {memoriesSubext}
                </p>
            </div>

            <div className="relative w-full max-w-[300px] h-[350px] md:h-[400px] md:max-w-[350px] mx-auto mb-6 flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout">
                    {visiblePhotos.map((photoItem) => {
                        const isTop = photoItem.stackIndex === 0;
                        const isMiddle = photoItem.stackIndex === 1;
                        const isBottom = photoItem.stackIndex === 2;

                        let rotate = 0;
                        let y = 0;
                        let x = 0;
                        let scale = 1;
                        let opacity = 1;
                        let zIndex = 30;

                        if (isTop) {
                            rotate = 0;
                            y = 0;
                            x = 0;
                            scale = 1;
                            opacity = 1;
                            zIndex = 30;
                        } else if (isMiddle) {
                            rotate = 4;
                            y = 12;
                            x = 8;
                            scale = 0.95;
                            opacity = 0.8;
                            zIndex = 20;
                        } else if (isBottom) {
                            rotate = -5;
                            y = 20;
                            x = -4;
                            scale = 0.9;
                            opacity = 0.5;
                            zIndex = 10;
                        }

                        return (
                            <motion.div
                                key={photoItem.originalIndex}
                                initial={{
                                    opacity: 0,
                                    scale: scale,
                                    y: y,
                                    x: x,
                                    rotate: rotate
                                }}
                                animate={{
                                    opacity: opacity,
                                    scale: scale,
                                    y: y,
                                    x: x,
                                    rotate: rotate,
                                    zIndex: zIndex
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -200,
                                    rotate: -20,
                                    scale: 0.9,
                                    transition: { duration: 0.4, ease: "easeInOut" }
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="absolute inset-0 bg-[#FDF7F1] rounded-xl p-4 pb-16 md:pb-20 border border-[#E0AA8A] flex flex-col"
                                style={{
                                    boxShadow: '0 10px 40px -10px rgba(232, 90, 95, 0.15)',
                                    transformOrigin: 'bottom center'
                                }}
                            >
                                <div className="w-full grow rounded-lg overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={photoItem.url}
                                        alt={`Memory ${photoItem.originalIndex + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
                                </div>

                                {/* Only show the heart pin on the topmost card */}
                                {isTop && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, type: "spring" }}
                                        className="absolute -top-4 right-4 md:-top-5 md:-right-5 w-10 h-10 md:w-12 md:h-12 bg-[#E85A5F] rounded-full shadow-lg flex items-center justify-center border-4 border-white rotate-12 z-20"
                                    >
                                        <Heart size={20} className="text-white fill-white" />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4 mt-8">
                <p className=" text-[#8b6b6d] text-sm md:text-base font-bold">
                    {currentIndex + 1} / {photos.length}
                </p>

                <div className="flex items-center justify-center gap-6 bg-[#FDF2EC] rounded-full backdrop-blur-md border border-pink-200">
                    <button
                        onClick={handlePrev}
                        className={`p-3 rounded-full border border-pink-200 transition-all ${currentIndex === 0 ? 'text-gray-300 border-gray-200! cursor-not-allowed' : 'text-[#E85A5F] hover:bg-[#FFF5F3]'}`}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <div className="text-[#E85A5F]">
                        <LayoutGrid size={24} />
                    </div>
                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-pink-200 text-[#E85A5F] hover:bg-[#FFF5F3] transition-all flex items-center justify-center"
                    >
                        {currentIndex === photos.length - 1 ? <Check size={28} /> : <ChevronRight size={28} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Screen3_Memories