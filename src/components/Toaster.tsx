import React, { useEffect } from 'react';
import {
  toast,
  Toaster as ReactToaster,
  useToasterStore
} from 'react-hot-toast';
import type { ToasterProps as ReactToasterProps } from 'react-hot-toast';
import { TOAST_LIMIT } from '~/lib/constants';

interface ToasterProps extends ReactToasterProps {}

export const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <ReactToaster
      toastOptions={{
        className: 'text-sm font-medium select-none rounded-lg p-2'
      }}
      {...props}
    />
  );
};
