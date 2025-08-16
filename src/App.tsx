import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Expect the following in /public:
//   /music.mp3
//   /files/video.mp4

const glow: React.CSSProperties = { 
  textShadow: '0 0 14px rgba(255,255,255,0.85), 0 0 30px rgba(255,255,255,0.35)' 
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audioRef.current = audio

    const canplay = () => setIsReady(true)
    audio.addEventListener('canplaythrough', canplay, { once: true } as any)
    audio.load()

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const handleStart = async () => {
    try { 
      if (audioRef.current) {
        audioRef.current.muted = muted
      }
      await audioRef.current?.play() 
    } catch (e) { console.warn('Autoplay blocked:', e) }
    setStarted(true)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setMuted(audioRef.current.muted)
  }

  const CONTRACT = 'Contract Address Loading ...' // <- replace with your CA

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) { console.error(e) }
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background video (lowest) */}
      <video
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
        src="/files/video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* 79% dark tint overlay (above video) */}
      <div className="pointer-events-none fixed inset-0 z-10" style={{ background: 'rgba(0,0,0,0.79)' }} />

      {/* Top-right mute/unmute button */}
      {started && (
        <button
          onClick={toggleMute}
          className="absolute right-4 top-4 z-50 rounded-full border border-white/30 bg-black/40 p-3 text-white hover:bg-black/60 transition"
          style={glow}
          aria-label={muted ? 'Unmute' : 'Mute'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            // Muted icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.31l2.5 2.5V12zM3 9v6h4l5 5V4L7 9H3zm15.73 11.73L3.27 5.27 4.73 3.8 20.2 19.27 18.73 20.73z" />
            </svg>
          ) : (
            // Unmuted icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M3 9v6h4l5 5V4L7 9H3zm10.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.45-.52 8-4.28 8-8.77s-3.55-8.25-8-8.77z" />
            </svg>
          )}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section
            key="intro"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
            className="relative z-20 flex h-dvh w-full flex-col items-center justify-center p-6 text-center"
          >
            <motion.h1
              style={glow}
              className="mb-6 font-semibold tracking-wide text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-3xl md:text-5xl">Are you ready to make it?</span>
            </motion.h1>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-2xl border border-white/30 bg-white/5 px-8 py-3 font-medium text-white backdrop-blur-xl transition-all hover:border-white/50 hover:bg-white/10"
            >
              <span style={glow} className="inline-flex items-center gap-2 text-lg">
                {isReady ? 'Enter' : 'Loading audio…'}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 opacity-80 transition group-hover:translate-x-0.5">
                  <path d="M13.5 4.5l6 7.5-6 7.5m-9-15h9" />
                </svg>
              </span>
            </motion.button>
            <p className="mt-4 text-sm text-white/70">(Click above to enter the website)</p>
          </motion.section>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20 flex h-dvh w-full flex-col items-center justify-center p-6"
          >
            <motion.h1
              style={glow}
              className="select-none text-center font-extrabold tracking-wider text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <span className="block text-5xl md:text-7xl">$NYMI</span>
            </motion.h1>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ActionButton href="https://x.com/NigerYouMadeIt" label="Twitter" />
              <ActionButton href="https://x.com/i/communities/1956706376824005092" label="Community" />
              <CopyButton onClick={copyCA} label={copied ? 'Copied' : 'Copy CA'} />
            </motion.div>

            <div className="mt-4 text-center text-xs text-white/70" style={glow}>
              {CONTRACT}
            </div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl"
                  style={glow}
                >
                  Contract address copied!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 z-20 [background:radial-gradient(80%_60%_at_50%_50%,transparent_0%,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  )
}

function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-white/50 hover:bg-white/10"
      style={glow}
    >
      {label}
    </motion.a>
  )
}

function CopyButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-white/50 hover:bg-white/10"
      style={glow}
    >
      {label}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M9 7a2 2 0 012-2h7a2 2 0 012 2v9a2 2 0 01-2 2h-7a2 2 0 01-2-2V7zm-4 4a2 2 0 012-2h1v2H7v7h7v-1h2v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-7z" />
      </svg>
    </motion.button>
  )
}
