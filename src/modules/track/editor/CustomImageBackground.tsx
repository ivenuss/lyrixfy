import { Trash } from 'react-feather';

interface CustomImageBackgroundProps {
  image: {
    url: string;
    name: string;
    size: number;
  };
  onImageRemove: () => void;
}

// Credits: https://stackoverflow.com/a/73090362
export function humanReadableSize(size: number) {
  let convertedSize = size;

  for (const unit of ['b', 'Kb', 'MB', 'GB']) {
    if (convertedSize < 1024) return `${convertedSize.toFixed(2)} ${unit}`;

    convertedSize /= 1024.0;
  }

  return convertedSize;
}

export const CustomImageBackground: React.FC<CustomImageBackgroundProps> = ({
  image,
  onImageRemove
}) => (
  <div className="flex h-16 items-center rounded-md bg-gray-200 p-2 dark:bg-primary-700">
    <img
      src={image.url}
      alt="Background"
      className="h-full flex-none rounded-md border border-gray-300 object-cover dark:border-primary-600"
    />

    <div className="mx-4 overflow-hidden leading-tight">
      <div className="truncate text-base text-black dark:text-primary-100">
        {image.name}
      </div>
      <div className="text-xs text-gray-600 dark:text-primary-300">
        {humanReadableSize(image.size)}
      </div>
    </div>

    <button
      type="button"
      aria-label="Remove image"
      className="ml-auto px-2 text-red-500 hover:text-red-600"
      onClick={onImageRemove}
    >
      <Trash className="h-5 w-5" />
    </button>
  </div>
);
