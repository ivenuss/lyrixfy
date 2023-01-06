import { toast } from 'react-hot-toast';

export const copyTextToClipboard = (text: string, successMessage: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(successMessage);
  });
};

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const percentToHex = (p: number) => {
  const intValue = Math.round((p / 100) * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, '0').toUpperCase();
};
