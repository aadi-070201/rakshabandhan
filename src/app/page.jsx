"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Screen1_Intro from '@/components/screens/Screen1_Intro';
import Screen2_Celebration from '@/components/screens/Screen2_Celebration';
import Screen3_Memories from '@/components/screens/Screen3_Memories';
import Screen4_Puzzle from '@/components/screens/Screen4_Puzzle';
import Screen5_Message from '@/components/screens/Screen5_Message';
import Music from '@/components/Music';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [musicOn, setMusicOn] = useState(false)

  const screens = [
    <Screen1_Intro key="screen1" onNext={() => {
      setMusicOn(true)
      setCurrentScreen(1)
    }} />,
    <Screen2_Celebration key="screen2" onNext={() => setCurrentScreen(2)} />,
    <Screen3_Memories key="screen3" onNext={() => setCurrentScreen(3)} />,
    <Screen4_Puzzle key="screen4" onNext={() => setCurrentScreen(4)} />,
    <Screen5_Message key="screen5" />,
  ]

  return (
    <div className="relative min-h-screen h-full w-full flex flex-col items-center justify-center select-none overflow-hidden">

      <Music shouldPlay={musicOn} />

      {/* Hanging threads */}
      <AnimatePresence mode="wait">
        {currentScreen < 2 &&
          <>
            <motion.div
              key="hanging-threads"
              initial={{ opacity: 0, }}
              animate={{ opacity: 0.9, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.5 }}
            >
              <img src="/stickers/hanging-threads.avif" alt="decoration" className='absolute left-0 h-40 sm:h-60' />
              <img src="/stickers/hanging-threads.avif" alt="decoration" className='absolute right-0 h-40 sm:h-60 scale-x-[-1]' />
            </motion.div>

            <motion.div
              key="bottom-decoration"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 w-full -z-1">
              <img src="/stickers/bottom-decoration.avif" alt="" className="opacity-90 sm:hidden" />
              <img src="/stickers/bottom-decoration-sm.avif" alt="" className="opacity-85 hidden sm:flex" />
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Flowers */}
      <AnimatePresence mode="wait">
        {currentScreen > 1 && currentScreen < 4 &&
          <>
            <motion.div
              key="flowers-top"
              initial={{ opacity: 0, }}
              animate={{ opacity: 0.9, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.6 }}
            >
              <img src="/stickers/flower.avif" alt="decoration" className='absolute -left-1 h-30 sm:h-44 -rotate-4' />
              <img src="/stickers/flower.avif" alt="decoration" className='absolute -right-1 h-30 sm:h-44 scale-x-[-1] rotate-4' />
            </motion.div>

            <motion.div
              key="bottom-decoration"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.6 }}
            >
              <img src="/stickers/bottom-flower.avif" alt="flower" className="h-30 md:h-40 absolute -bottom-1 left-0" />
              <img src="/stickers/bottom-flower.avif" alt="flower" className="h-30 md:h-40 absolute -bottom-1 right-0 scale-x-[-1]" />
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Final Screen Decoration */}
      <AnimatePresence mode="wait">
        {currentScreen > 3 &&
          <>
            <motion.div
              key="final-decor"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.6 }}
            >
              <img src="/stickers/final-decor.avif" alt="decoration" className='absolute -left-1 sm:h-56' />
              <img src="/stickers/flower.avif" alt="decoration" className='absolute -right-1 hidden min-[820px]:block sm:h-44 scale-x-[-1] rotate-4' />
            </motion.div>

            <motion.div
              key="final-bottom-decoration"
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-0 w-full -z-1"
            >
              <img src="/stickers/final-bottom-decor.avif" alt="" className="opacity-85" />
            </motion.div>
          </>
        }
      </AnimatePresence>

      <div className="relative w-full flex grow flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
            transition={{ duration: 0.6 }}
            className='flex flex-col items-center justify-center overflow-hidden will-change-transform'
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Watermark */}
      {/* <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="fixed bottom-4 right-4 text-sm font-thin text-black/40 bg-white/60 rounded-md px-2 pointer-events-none z-50 tracking-wide">
        anujbuilds.in
      </motion.div> */}
    </div >
  );
}