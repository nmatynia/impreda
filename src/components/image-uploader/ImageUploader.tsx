import Image from 'next/image';
import React, { useState } from 'react';
import clsxm from '../../utils/clsxm';
import { DialogModal } from '../dialog/DialogModal';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';

export type ImageType = {
  src: string;
  filename: string;
  file: Blob;
};
type ImageUploaderProps = {
  images: ImageType[];
  isLoading?: boolean;
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

export const ImageUploader = ({ images, isLoading, setImages }: ImageUploaderProps) => {
  const [previewedImage, setPreviewedImage] = useState<ImageType | null>(null);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const handleOpenPreviewDialog = (image: ImageType) => {
    setPreviewedImage(image);
    setIsPreviewDialogOpen(true);
  };
  const handleClosePreviewDialog = () => {
    setIsPreviewDialogOpen(false);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: Blob[] = Array.from(e.target.files as FileList);
    const imagesObj = files.map(file => ({
      src: URL.createObjectURL(file),
      filename: file.name,
      file
    }));
    setImages([...images, ...imagesObj]);
  };

  const handleDeleteImage = (src: string) => {
    const newImages = images.filter(image => image.src !== src);
    setImages(newImages);
  };
  if (isLoading) {
    return <div className={clsxm('flex h-32 w-full', 'animate-pulse bg-primaryBlack/50')} />;
  }
  return (
    <>
      <DialogModal
        title={previewedImage?.filename ?? 'Image preview'}
        isOpen={isPreviewDialogOpen}
        handleCloseDialog={handleClosePreviewDialog}
        className="w-[calc(50vw-4rem)] max-w-3xl whitespace-nowrap"
      >
        <div className="relative aspect-[0.75] max-h-screen w-full overflow-hidden rounded-sm">
          <Image src={previewedImage?.src ?? ''} alt="item" className="z-0 object-contain" fill />
        </div>
      </DialogModal>

      <>
        <div
          className={clsxm(
            'relative flex h-32 w-full flex-col items-center justify-center border-[1px] border-dashed border-primaryBlack',
            'cursor-pointer gap-2 focus-within:border-[2px]'
          )}
        >
          <SvgIcon name="Upload" />
          <BodyText>Upload item&apos;s photos</BodyText>
          <input
            id="file-uploader"
            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleImageChange}
          />
        </div>
        {images.length > 0 && (
          <div className="flex w-full gap-4 overflow-x-auto">
            {images.map(image => (
              <div
                className="relative mt-2 h-32 w-32 flex-shrink-0 border-[1px] border-primaryBlack"
                key={image.src}
              >
                <button
                  type="button"
                  className={clsxm(
                    'flex items-center justify-center',
                    'absolute top-0 right-0 z-10 h-4 w-4 translate-x-1/2 -translate-y-1/2',
                    'cursor-pointer rounded-full bg-primaryBlack'
                  )}
                  onClick={() => handleDeleteImage(image.src)}
                >
                  <SvgIcon name="Cross" className="h-2 w-2 fill-primaryWhite" />
                </button>
                <Image
                  key={image.src}
                  src={image.src}
                  alt="item"
                  className="z-0 object-cover"
                  fill
                  onClick={() => handleOpenPreviewDialog(image)}
                />
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};
