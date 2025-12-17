"use client";

import { useMusic, Song } from "@/lib/music-context";
import { useState, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAYLIST: Song[] = [
  {
    id: "1",
    title: "Vibes",
    artist: "Beads By DoBeE",
    url: "/music/beads-vibes.mp3",
  },
  {
    id: "2",
    title: "Lofi Beats",
    artist: "Beads By DoBeE",
    url: "/music/lofi-beats.mp3",
  },
  {
    id: "3",
    title: "Chill Mix",
    artist: "Beads By DoBeE",
    url: "/music/chill-mix.mp3",
  },
];

export function MusicPlayer() {
  const { currentSong, isPlaying, toggle, setSong } = useMusic();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Playlist Dropdown */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 w-48 mb-2 max-h-64 overflow-y-auto">
          <p className="text-xs font-semibold text-white/60 mb-2">PLAYLIST</p>
          {PLAYLIST.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                setSong(song);
                setIsExpanded(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm mb-1 transition ${
                currentSong?.id === song.id
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="font-medium truncate">{song.title}</div>
              <div className="text-xs text-white/50">{song.artist}</div>
            </button>
          ))}
        </div>
      )}

      {/* Main Player */}
      <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-full p-3 flex items-center gap-3 hover:bg-black/90 transition">
        {/* Current Song Display */}
        {currentSong && (
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <Music className="w-4 h-4 text-white/70 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-white/50 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>
        )}

        {/* Play/Pause Button */}
        <Button
          onClick={toggle}
          disabled={!currentSong}
          size="sm"
          className="rounded-full p-2 h-10 w-10"
          variant="ghost"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>

        {/* Playlist Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          className="rounded-full p-2 h-10 w-10"
          variant="ghost"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
