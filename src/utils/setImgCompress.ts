import imageCompression from 'browser-image-compression';

export const setImgCompress = async (fileSrc: File) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(fileSrc, options);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};
