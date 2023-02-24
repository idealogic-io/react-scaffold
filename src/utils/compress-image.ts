// TODO remove if not used
export const compressImage = async (dataURL: string, desiredSizeInBytes: number) => {
  return new Promise<string>(resolve => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const width = image.width;
      const height = image.height;

      canvas.width = width;
      canvas.height = height;

      context ? context.drawImage(image, 0, 0, width, height) : null;
      // 0.92 is the default value of the toDataURL method itself, so the calculation starts from this value
      let quality = 0.92;
      let newFileSize = dataURL.length;
      let compressedDataURL = dataURL;

      while (newFileSize > desiredSizeInBytes && quality > 0.1) {
        // the step is small because with a slight deterioration in image quality, its size decreases by a lot
        quality -= 0.02;
        compressedDataURL = canvas.toDataURL("image/jpeg", quality);
        newFileSize = compressedDataURL.length;
      }

      resolve(compressedDataURL);
    };

    image.src = dataURL;
  });
};
