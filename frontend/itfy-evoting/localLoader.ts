import { ImageLoaderProps } from "next/image";

export  const localLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  // If it's a full localhost URL, strip to relative path
  if (src.startsWith('http://localhost:3000/') || src.startsWith('http://127.0.0.1:3000/')) {
    return src.replace(/^http:\/\/(?:localhost|127\.0\.0\.1):3000/, '');
  }
  return src; // fallback for external images
};

export default localLoader;
