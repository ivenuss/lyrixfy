import React, { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useHotkeys } from 'react-hotkeys-hook';
import { Copy, Download, Share } from 'react-feather';
import { Button } from '~/components/Button';
import { useTrackStore } from '~/stores/track.store';
import {
  copyImageToClipboard,
  downloadImage,
  shareCardImage
} from '~/lib/image';
import { SHORTCUTS } from '~/lib/constants';
import type { TrackDetails } from '~/types/spotify';

interface ExportProps {
  track: TrackDetails;
}

export const Export: React.FC<ExportProps> = ({ track }) => {
  const embed = useTrackStore((state) => state.embed);

  const handleDownload = useCallback(
    async (format: 'png' | 'jpg' | 'svg') => {
      const element = document.getElementById('canvas');
      if (!element) return;

      downloadImage(
        element,
        format,
        track.name,
        embed.lines.sort((a, b) => a.id - b.id).map(({ words }) => words)
      ).then(() => {
        toast.success('Downloaded image');
      });
    },
    [embed.lines, track.name]
  );

  const handleCopy = useCallback(() => {
    const element = document.getElementById('canvas');
    if (!element) return;

    toast.promise(copyImageToClipboard(element), {
      loading: 'Copying',
      success: 'Copied image to clipboard',
      error: () => `Your browser doesn't support this feature.`
    });
  }, []);

  const handleShare = useCallback(() => {
    const element = document.getElementById('canvas');
    if (!element) return;

    shareCardImage(
      element,
      track.name,
      track.artists.map(({ name }) => name).join(', ')
    );
  }, [track.artists, track.name]);

  // Shortcuts
  useHotkeys(SHORTCUTS.EXPORT_AS_PNG, (e) => {
    e.preventDefault();
    handleDownload('png');
  });

  useHotkeys(SHORTCUTS.EXPORT_AS_JPG, (e) => {
    e.preventDefault();
    handleDownload('jpg');
  });

  useHotkeys(SHORTCUTS.EXPORT_AS_SVG, (e) => {
    e.preventDefault();
    handleDownload('svg');
  });

  useHotkeys(SHORTCUTS.COPY_IMAGE_TO_CLIPBOARD, (e) => {
    e.preventDefault();
    handleCopy();
  });

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-2">
      <Button
        icon={Download}
        onClick={() => handleDownload('png')}
        className="col-span-2"
      >
        Download
      </Button>

      <Button icon={Copy} color="secondary" onClick={handleCopy}>
        Copy
      </Button>
      <Button icon={Share} color="secondary" onClick={handleShare}>
        Share
      </Button>
    </div>
  );
};
