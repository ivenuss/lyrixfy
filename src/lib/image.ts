import { toBlob, toPng, toJpeg, toSvg } from 'html-to-image';
import { toast } from 'react-hot-toast';

export const getBlob = async (node: HTMLElement) => {
  return toBlob(node, { cacheBust: true });
};

export const copyImageToClipboard = async (node: HTMLElement) => {
  const blob = await getBlob(node);

  if (!blob) return;

  navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
};

export const shareCardImage = async (
  node: HTMLElement,
  title: string,
  desc: string
) => {
  const blob = await getBlob(node);

  if (!blob) return;

  if (!navigator.share) {
    toast.error(`Your browser doesn't support this feature.`);
    return;
  }

  navigator.share({
    title,
    text: desc,
    files: [new File([blob], 'file.png', { type: blob.type })]
  });
};

export const downloadImage = async (
  node: HTMLElement,
  format: 'png' | 'jpg' | 'svg',
  title: string,
  lines: string[]
) => {
  let dataUrl = null;

  if (format === 'png') {
    dataUrl = await toPng(node);
  } else if (format === 'jpg') {
    dataUrl = await toJpeg(node);
  } else {
    dataUrl = await toSvg(node);
  }

  const link = document.createElement('a');

  const name = `${title.replace(/[.\s]+/g, '_')}_${lines
    .map((w) => w.split(' ')[0])
    .join('_')}`.toLowerCase();

  link.download = `${name}.${format}`;
  link.href = dataUrl;
  link.click();
  link.remove();
};
