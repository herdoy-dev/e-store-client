"use client";
import { X } from "lucide-react";
import Image from "next/image";
import ImageUploader from "./image-uploader";

interface ImagesUploaderProps {
  images: string[];
  onPickImages: (images: string[]) => void;
  maxFiles?: number;
}

function ImagesUploader({
  images = [],
  onPickImages,
  maxFiles = 5,
}: ImagesUploaderProps) {
  const handleAddImage = (newImage: string) => {
    if (images.length >= maxFiles) return;
    onPickImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onPickImages(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative w-14 h-14">
            <Image
              src={img}
              width={56}
              height={56}
              alt="Uploaded preview"
              className="w-14 h-14 object-cover rounded-md"
              priority
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {images.length < maxFiles && (
          <ImageUploader
            image={null}
            onPickImage={handleAddImage}
            onClearImage={() => {}}
          />
        )}
      </div>
      {images.length >= maxFiles && (
        <p className="text-sm text-muted-foreground">
          Maximum {maxFiles} images reached
        </p>
      )}
    </div>
  );
}

export default ImagesUploader;
