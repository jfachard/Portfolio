import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <img src={track.image} alt={`${track.album} cover`} className="album-cover" />
  ) : (
    <div className="album-cover-placeholder">
      <svg viewBox="0 0 24 24" fill="currentColor" className="music-icon">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>
  );

  return (
    <motion.a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      title={`${track.name} - ${track.artist}`}
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
      </div>

      {/* Mobile: compact pill */}
      <div className="lg:hidden flex items-center gap-2 bg-[#1e293b]/90 backdrop-blur-lg rounded-full pl-1 pr-3 py-1 border border-[#475569]/30 max-w-[180px]">
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
        <div className="overflow-hidden">
          <p className="text-[#f1f5f9] text-xs font-semibold truncate leading-tight">{track.name}</p>
          <p className="text-[#94a3b8] text-xs truncate leading-tight">{track.artist}</p>
        </div>
      </div>
    </motion.a>
  );
};
