import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "NEURAL_DRIFT_01",
    artist: "CYBER_MIND",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "var(--color-neon-cyan)"
  },
  {
    id: 2,
    title: "GLITCH_CORE_X",
    artist: "VOID_RUNNER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "var(--color-neon-magenta)"
  },
  {
    id: 3,
    title: "SYNTH_PULSE_99",
    artist: "DATA_GHOST",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "var(--color-neon-yellow)"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleTrackEnd = () => {
    skipForward();
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md p-6 bg-black/40 backdrop-blur-md glitch-border rounded-lg">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-magenta)] flex items-center justify-center rounded shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="w-10 h-10 border-2 border-black/20 rounded-full flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-black/20 rounded-full" />
          </motion.div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-pixel text-[var(--color-neon-cyan)] truncate glitch-text">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-[var(--color-neon-magenta)] uppercase tracking-widest">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[var(--color-neon-cyan)] shadow-[0_0_10px_var(--color-neon-cyan)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button onClick={skipBackward} className="p-2 text-white/50 hover:text-[var(--color-neon-cyan)] transition-colors">
            <SkipBack size={24} />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-[var(--color-neon-cyan)] text-black rounded-full hover:bg-[var(--color-neon-magenta)] transition-all shadow-[0_0_20px_var(--color-neon-cyan)]"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>

          <button onClick={skipForward} className="p-2 text-white/50 hover:text-[var(--color-neon-cyan)] transition-colors">
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-white/30">
          <div className="flex items-center space-x-2">
            <Volume2 size={12} />
            <span>ENCRYPTED_STREAM</span>
          </div>
          <div className="flex space-x-2">
            <span className={isPlaying ? "text-[var(--color-neon-cyan)] animate-pulse" : ""}>
              {isPlaying ? "STREAMING" : "BUFFERED"}
            </span>
            <span>//</span>
            <span>0x{currentTrack.id.toString(16).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
