import clsx from 'clsx';
import React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';

interface DropzoneProps extends DropzoneOptions {
  children?: React.ReactNode;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  children,
  className = '',
  ...props
}) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone(props);

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'cursor-pointer rounded-md border-2 border-dashed p-6 transition-colors',
        isDragActive
          ? 'border-accent'
          : 'border-gray-300 dark:border-primary-700',
        { 'border-red-500': isDragReject },
        className
      )}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
