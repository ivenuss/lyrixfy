import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Dropzone } from '~/components/Dropzone';
import { ALLOWED_FILE_TYPES } from '~/lib/constants';
import { useTrackStore } from '~/stores/track.store';
import { CustomImageBackground } from './CustomImageBackground';

export const CustomBackgroundDropzone: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  const pasteClipboardImage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      const file = e?.clipboardData?.files[0];
      if (!file) return;

      if (embed.backgroundImage) {
        toast.error('There is already existing image');
        return;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error('Unsupported file type');
        return;
      }

      const imgSrc = URL.createObjectURL(file);

      setEmbed({
        backgroundImage: { name: file.name, size: file.size, url: imgSrc }
      });
      toast.success('Pasted image from clipboard');
    },
    [embed.backgroundImage, setEmbed]
  );

  useEffect(() => {
    window.addEventListener('paste', pasteClipboardImage);

    return () => {
      window.removeEventListener('paste', pasteClipboardImage);
    };
  }, [pasteClipboardImage]);

  const handleOnDrop = useCallback(
    ([file]: File[]) => {
      if (!file) return;

      setEmbed({
        ...embed,
        backgroundImage: {
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size
        }
      });
    },
    [embed, setEmbed]
  );

  return (
    <div>
      {embed.backgroundImage ? (
        <CustomImageBackground
          image={embed.backgroundImage}
          onImageRemove={() => setEmbed({ ...embed, backgroundImage: null })}
        />
      ) : (
        <Dropzone
          maxFiles={1}
          className="p-5"
          accept={Object.fromEntries(
            ALLOWED_FILE_TYPES.map((type) => [type, []])
          )}
          onDrop={handleOnDrop}
        >
          <div className="flex select-none flex-col items-center text-center">
            <div className="mb-0.5 text-lg font-medium leading-tight text-black dark:text-primary-200">
              Upload a Photo or paste it from clipboard
            </div>
            <div className="text-sm text-gray-600 dark:text-primary-300">
              Supported file types: PNG, JPG, JPEG
            </div>
          </div>
        </Dropzone>
      )}
    </div>
  );
};
