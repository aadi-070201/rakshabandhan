"use client"

import { useEffect, useRef } from "react"
import { backgroundMusic } from "@/data"

export default function Music({ shouldPlay }) {
    const audioRef = useRef(null)

    useEffect(() => {
        if (shouldPlay && audioRef.current) {
            audioRef.current.volume = 0.7
            audioRef.current.play().catch(console.log)
        }
    }, [shouldPlay])

    return (
        <audio ref={audioRef} loop preload="none">
            <source src={backgroundMusic} type="audio/mpeg" />
        </audio>
    )
}