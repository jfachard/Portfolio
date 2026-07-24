import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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
  const [onFooter, setOnFooter] = useState(false);

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
        const image =
          recentTrack.image?.find((img: { size: string; '#text': string }) => img.size === 'large')?.[
            '#text'
          ] ||
          recentTrack.image?.[2]?.['#text'] ||
          '';

        setTrack({
          name: recentTrack.name,
          artist: recentTrack.artist?.['#text'] || recentTrack.artist,
          album: recentTrack.album?.['#text'] || '',
          image,
          isPlaying,
          url: recentTrack.url,
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

  useEffect(() => {
    const update = () => {
      const contact = document.getElementById('contact');
      if (!contact) return;
      const rect = contact.getBoundingClientRect();
      // widget fixed en bas → footer dès que le sage couvre cette zone
      setOnFooter(rect.top < window.innerHeight - 48);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (loading || !track) return null;

  return (
    <motion.a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="inline-flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 max-w-[min(280px,85vw)] transition-colors duration-200"
      style={
        onFooter
          ? {
              background: 'var(--bg-color)',
              border: '1px solid rgb(33 35 40 / 0.2)',
              color: 'var(--text-color)',
            }
          : {
              background: 'oklch(94% 0.006 250 / .06)',
              border: '1px solid oklch(94% 0.006 250 / .15)',
              color: 'var(--text-color)',
            }
      }
    >
      <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0 relative">
        {track.image ? (
          <img
            src={track.image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="stripe w-full h-full"
            style={{
              ['--s1' as string]: 'rgb(135 179 141 / .35)',
              ['--s2' as string]: 'rgb(135 179 141 / .1)',
            }}
          />
        )}
      </div>

      <div className="min-w-0 leading-tight">
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] m-0 flex items-center gap-2"
          style={{ color: 'var(--accent)' }}
        >
          {track.isPlaying ? texts.nowPlaying : texts.lastPlayed}
          {track.isPlaying && (
            <span className="playing-bars" aria-hidden>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          )}
        </p>
        <p className="text-[13px] font-medium m-0 truncate">
          {track.name}{' '}
          <span className="opacity-60">— {track.artist}</span>
        </p>
      </div>
    </motion.a>
  );
};
