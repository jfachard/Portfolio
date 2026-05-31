import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  isPlaying: boolean;
  url: string;
}

interface NowPlayingProps {
  texts: {
    nowPlaying: string;
    lastPlayed: string;
  };
}

export const NowPlaying = ({ texts }: NowPlayingProps) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchNowPlaying = async () => {
    try {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const username = import.meta.env.VITE_LASTFM_USERNAME;

      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
      );

      const data = await response.json();
      const recentTrack = data.recenttracks?.track?.[0];

      if (recentTrack) {
        const isPlaying = recentTrack['@attr']?.nowplaying === 'true';
        const image = recentTrack.image?.find((img: { size: string; '#text': string }) => img.size === 'large')?.['#text']
          || recentTrack.image?.[2]?.['#text']
          || '';

        setTrack({
          name: recentTrack.name,
          artist: recentTrack.artist?.['#text'] || recentTrack.artist,
          album: recentTrack.album?.['#text'] || '',
          image,
          isPlaying,
          url: recentTrack.url
        });
      }
    } catch (error) {
      console.error('Error fetching Last.fm data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !track) {
    return null;
  }

  const circularText = track.isPlaying ? texts.nowPlaying : texts.lastPlayed;
  const repeatedText = `${circularText} · `.repeat(4);

  const albumArt = track.image ? (
    <img src={track.image} alt={`${track.album} cover`} className="album-cover" loading="lazy" />
  ) : (
    <div className="album-cover-placeholder">
      <svg viewBox="0 0 24 24" fill="currentColor" className="music-icon">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>
  );

  const marqueeText = `${track.name}  ·  ${track.name}  ·  `;

  return (
    <motion.a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Desktop: full circular vinyl widget */}
      <div className="now-playing-widget hidden lg:flex">
        <div className="rotating-text">
          <svg viewBox="0 0 100 100" className="circular-text-svg">
            <defs>
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="circular-text">
              <textPath href="#circlePath">{repeatedText}</textPath>
            </text>
          </svg>
        </div>
        <div className="album-cover-container">
          {albumArt}
          {track.isPlaying && (
            <div className="playing-indicator">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          )}
        </div>

        {/* Custom tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-3 min-w-[180px] max-w-60 p-3 rounded-2xl pointer-events-none"
              style={{
                background: 'rgba(15,23,42,0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px -8px rgba(0,0,0,0.5)',
              }}
            >
              <p className="text-[#f5f0e8] text-sm font-semibold truncate">{track.name}</p>
              <p className="text-[#9c9488] text-xs truncate mt-0.5">{track.artist}</p>
              {track.album && (
                <p className="text-[#7a7262] text-xs truncate mt-0.5">{track.album}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: compact pill */}
      <div className="lg:hidden flex items-center gap-2 bg-[#1c1810]/90 backdrop-blur-lg rounded-full pl-1 pr-3 py-1 border border-[#3d3628]/30 max-w-[180px]">
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative">
          {albumArt}
          {track.isPlaying && (
            <div className="playing-indicator">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          )}
        </div>
        <div className="overflow-hidden flex-1 min-w-0">
          {track.isPlaying ? (
            <div className="overflow-hidden">
              <span className="animate-marquee text-[#f5f0e8] text-xs font-semibold leading-tight">
                {marqueeText}
              </span>
            </div>
          ) : (
            <p className="text-[#f5f0e8] text-xs font-semibold truncate leading-tight">{track.name}</p>
          )}
          <p className="text-[#9c9488] text-xs truncate leading-tight">{track.artist}</p>
        </div>
      </div>
    </motion.a>
  );
};
