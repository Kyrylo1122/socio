import Resizer from "react-image-file-resizer";

const resizeFile = (image: File, fileType: "file" | "image") => {
  const file = fileType === "file" ? "file" : "base64";
  const imageFormat = image.type.split("/").pop()?.toUpperCase();
  const fileFormat =
    imageFormat === "JPG" || !imageFormat ? "JPEG" : imageFormat;

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      fileFormat,
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      file
    );
  });
};

export default resizeFile;
