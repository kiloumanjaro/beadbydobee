"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  play: (song: Song) => void;
  pause: () => void;
  toggle: () => void;
  setSong: (song: Song) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const play = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const toggle = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const setSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider
      value={{ currentSong, isPlaying, play, pause, toggle, setSong }}
    >
      <audio ref={audioRef} />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}
