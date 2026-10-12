'use client';

import { useEffect, useRef } from 'react';

interface YTPlayer {
  cueVideoById(options: { videoId: string; startSeconds?: number; endSeconds?: number }): void;
}

interface YTNamespace {
  Player: new (
    el: HTMLIFrameElement,
    options: {
      events: {
        onReady: (event: { target: YTPlayer }) => void;
        onStateChange: (event: { data: number; target: YTPlayer }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

interface Props {
  youtubeId: string;
  start?: number;
  end?: number;
  title: string;
}

/**
 * Plays only `start`–`end` of a YouTube video. YouTube's own replay button
 * ignores those params and restarts from 0:00, so when the segment ends we
 * re-cue it at `start`. Embed URLs only take whole seconds, so the player is
 * also re-cued on load to honour fractional times like 281.5.
 */
export default function YouTubeSegment({ youtubeId, start, end, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    // Only load the API once the player is near the viewport, like the lazy iframe
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        loadYouTubeApi().then((YT) => {
          if (cancelled) return;
          const cue = (player: YTPlayer) =>
            player.cueVideoById({ videoId: youtubeId, startSeconds: start, endSeconds: end });
          new YT.Player(iframe, {
            events: {
              onReady: ({ target }) => {
                if ((start ?? 0) % 1 || (end ?? 0) % 1) cue(target);
              },
              onStateChange: ({ data, target }) => {
                if (data === YT.PlayerState.ENDED) cue(target);
              },
            },
          });
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(iframe);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [youtubeId, start, end]);

  const params = new URLSearchParams({ rel: '0', enablejsapi: '1' });
  if (start) params.set('start', String(Math.floor(start)));
  if (end) params.set('end', String(Math.ceil(end)));

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
      title={title}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="w-full h-full"
    />
  );
}
