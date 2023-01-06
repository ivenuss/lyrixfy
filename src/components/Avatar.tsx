import React from 'react';
import clsx from 'clsx';

interface AvatarProps {
  src?: string | null;
  className?: string;
  innerCn?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  className = 'h-8 w-8 text-sm',
  innerCn = 'text-primary-200 bg-primary-700'
}) => (
  <div className={clsx('flex-none', className)}>
    {src ? (
      <img
        src={src}
        alt="Avatar"
        className="h-full w-full rounded-full bg-primary-700"
      />
    ) : (
      <div
        className={clsx(
          'grid h-full w-full select-none place-items-center rounded-full font-bold',
          innerCn
        )}
      >
        ?
      </div>
    )}
  </div>
);
