import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MoveRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { puzzleFixedText, puzzleHeading, puzzleImage } from "@/data";

const useSwapPuzzle = (gridSize = 3) => {
    const numTiles = gridSize * gridSize;
    const [tiles, setTiles] = useState(Array.from({ length: numTiles }, (_, i) => i));
    const [isSolved, setIsSolved] = useState(false);
    const [moves, setMoves] = useState(0);
    const [selectedTileIndex, setSelectedTileIndex] = useState(null);
    const [isPreviewing, setIsPreviewing] = useState(true);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        setIsPreviewing(true);
        setIsSolved(false);
        setMoves(0);
        setSelectedTileIndex(null);
        setCountdown(3);

        const timerInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [numTiles]);

    useEffect(() => {
        if (countdown === 0 && isPreviewing) {
            let shuffled = Array.from({ length: numTiles }, (_, i) => i);
            do {
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
            } while (shuffled.every((val, i) => val === i));

            setTiles(shuffled);
            setIsPreviewing(false);
        }
    }, [countdown, isPreviewing, numTiles]);


    const handleTileClick = useCallback((index) => {
        if (isPreviewing || isSolved) return;

        if (selectedTileIndex === null) {
            setSelectedTileIndex(index);
        } else if (selectedTileIndex === index) {
            setSelectedTileIndex(null);
        } else {
            const newTiles = [...tiles];
            const temp = newTiles[selectedTileIndex];
            newTiles[selectedTileIndex] = newTiles[index];
            newTiles[index] = temp;

            setTiles(newTiles);
            setMoves(m => m + 1);
            setSelectedTileIndex(null);

            const won = newTiles.every((val, i) => val === i);
            if (won) setIsSolved(true);
        }
    }, [tiles, isPreviewing, isSolved, selectedTileIndex]);

    return { tiles, isSolved, handleTileClick, moves, selectedTileIndex, isPreviewing, countdown };
};

function Screen4_Puzzle({ onNext }) {

    const gridSize = 3;
    const { tiles, isSolved, handleTileClick, moves, selectedTileIndex, isPreviewing, countdown } = useSwapPuzzle(gridSize);

    useEffect(() => {
        if (isSolved && !isPreviewing) {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: [
                        '#E85D5D',
                        '#F4A6A6',
                        '#F6C453',
                        '#F3D7B3',
                        '#E8C4A8',
                    ]
                });
            }, 200);
        }
    }, [isSolved, isPreviewing]);;

    return (
        <motion.div
            className="flex flex-col items-center justify-center px-6 py-12 text-center relative w-full"
        >
            <div className="mt-6 mb-6 w-full flex flex-col items-center">
                <h2 className="font-merienda text-4xl md:text-5xl text-primary mb-3">{puzzleHeading}</h2>
                <motion.div
                    className="flex items-center justify-center gap-3 mb-3 w-full max-w-70">
                    <div className="h-px rounded-full bg-linear-to-r from-transparent to-[#FFB6B9] grow"></div>
                    <Heart size={20} className="text-[#cc181b] fill-accent-red" />
                    <div className="h-px rounded-full bg-linear-to-l from-transparent to-[#FFB6B9] grow"></div>
                </motion.div>

                <div className=" flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isPreviewing ? (
                            <motion.p key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-accent-red font-bold text-xl max-w-md">
                                Memorize the image! Shuffling in {countdown}s...
                            </motion.p>
                        ) : (
                            <motion.p key="play" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#8b6b6d] text-lg md:text-xl max-w-md">
                                Tap two pieces to swap them and fix the image!
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Puzzle Grid */}
            <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square mx-auto mb-8 bg-white p-3 rounded-2xl border border-[#E0AA8A] border-dashed">

                <div
                    className={`w-full h-full relative grid bg-gray-100 rounded-xl overflow-hidden shadow-inner transition-all duration-500 ease-in-out ${isPreviewing || isSolved ? 'gap-0' : 'gap-1'}`}
                    style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}
                >
                    {tiles.map((tileValue, index) => {
                        const isSelected = selectedTileIndex === index;

                        const col = tileValue % gridSize;
                        const row = Math.floor(tileValue / gridSize);

                        return (
                            <motion.div
                                key={tileValue}
                                layout
                                initial={false}
                                onClick={() => handleTileClick(index)}
                                className={`relative transition-all duration-300 overflow-hidden
                    ${isPreviewing || isSolved ? 'cursor-default rounded-none shadow-none' : 'cursor-pointer hover:brightness-110 rounded-sm shadow-sm'}
                    ${isSelected ? 'ring-4 ring-accent-red z-10 scale-90 rounded-md shadow-lg' : 'scale-100'}
                   `}
                            >
                                <div
                                    className="absolute"
                                    style={{
                                        width: `${gridSize * 100}%`,
                                        height: `${gridSize * 100}%`,
                                        left: `-${col * 100}%`,
                                        top: `-${row * 100}%`,
                                    }}
                                >
                                    <img
                                        src={puzzleImage}
                                        className="w-full h-full object-cover pointer-events-none"
                                        alt="Puzzle piece"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                <div
                    className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${isPreviewing || isSolved ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={puzzleImage}
                        className="w-full h-full object-cover"
                        alt="Seamless Perfect Image"
                    />
                </div>
                </div>
            </div>

            <div className="mt-auto w-full flex flex-col items-center">
                <div className="h-14">
                    {!isSolved || isPreviewing ? (
                        <p className={`font-semibold mb-6 flex items-center gap-2 transition-opacity duration-500 ${isPreviewing ? 'opacity-0' : 'opacity-100 text-[#8b6b6d]'}`}>
                            Swaps: {moves}
                        </p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                            className="flex flex-col items-center mb-6"
                        >
                            <p className="text-accent-red text-2xl font-medium flex items-center gap-2">
                                <Sparkles size={22} /> {puzzleFixedText}
                            </p>
                        </motion.div>
                    )}
                </div>
                <div className="h-13.75 flex justify-center items-center w-full">
                    <AnimatePresence>
                        {isSolved && !isPreviewing && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="will-change-transform"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={onNext}
                                    className="bg-linear-to-r from-accent-red to-[#FF8A8A] text-white cursor-pointer shadow-lg hover:shadow-xl font-medium md:text-lg py-4 px-8 rounded-full flex items-center justify-center mx-auto gap-2"
                                >
                                    Open Your Message <MoveRight size={18} />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

export default Screen4_Puzzle