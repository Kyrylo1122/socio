import { FileWithPath, useDropzone } from "react-dropzone";
import { useCallback } from "react";
import resizeFile from "src/utils/ResizeFile";
interface IFileUploader {
  onChange: (value: File) => void;
  setFileUrl: (value: string) => void;
}

const FileUploader = ({ onChange, setFileUrl }: IFileUploader) => {
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const imageFile = (await resizeFile(acceptedFiles[0], "file")) as File;
      const imageString = (await resizeFile(
        acceptedFiles[0],
        "image"
      )) as string;
      onChange(imageFile);

      setFileUrl(imageString);
    },
    [onChange, setFileUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div {...getRootProps()}>
      {/* <AvatarEditor width={250} height={250} image={image} /> */}
      <input {...getInputProps()} />
    </div>
  );
};

export default FileUploader;
