import { motion } from "framer-motion"
import { introHeading } from "@/data"

function Screen1_Intro({ onNext }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-5 relative w-full min-h-screen"
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="mb-6 mt-12 font-merienda text-primary text-2xl md:text-3xl leading-normal whitespace-pre-wrap"
      >
        {introHeading}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1 }}
        className="mb-6"
      >
        <img src="/stickers/siblings.avif" alt="siblings" className="w-70 md:w-80" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center">
          <p className="text-[#8b6b6d] text-base md:text-lg mb-5 font-semibold tracking-wide uppercase flex flex-col items-center">
            Tap the rakhi to continue
          </p>

          <img src="/stickers/arrow.svg" alt="arrow" className="w-16 -rotate-120 -mb-2" />

          <div className="relative max-[500px]:w-[150%] w-150 flex justify-center items-center">
            <motion.div className="cursor-pointer w-full">
              <img
                src="/stickers/rakhi.avif"
                alt="rakhi"
                className="w-full h-auto object-contain -rotate-6 hover:scale-103 active:scale-96 transition-all"
                onClick={onNext}
              />
            </motion.div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

export default Screen1_Intro