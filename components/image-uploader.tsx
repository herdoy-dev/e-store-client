"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSession from "@/hooks/useSession";
import { handleUpload } from "@/lib/utils";
import setCanvasPreview from "@/set-canvas-preview";
import { Flex } from "@radix-ui/themes";
import { Camera, X } from "lucide-react";
import NextImage from "next/image";
import { useCallback, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import { BeatLoader } from "react-spinners";

interface ImageUploaderProps {
  ASPECT_RATIO?: number;
  MIN_DIMENSION?: number;
  image?: string | null;
  onPickImage: (image: string) => void;
  onClearImage?: () => void;
  maxFileSizeKB?: number;
}

const ImageUploader = ({
  ASPECT_RATIO = 3 / 2,
  MIN_DIMENSION = 150,
  image,
  onPickImage,
  onClearImage,
  maxFileSizeKB = 500,
}: ImageUploaderProps) => {
  const { session } = useSession();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [crop, setCrop] = useState<Crop | undefined>();
  const [error, setError] = useState<string>("");

  const compressImage = async (
    dataUrl: string,
    quality = 0.7
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    });
  };

  const checkFileSize = useCallback(
    (file: File): boolean => {
      if (maxFileSizeKB && file.size > maxFileSizeKB * 1024) {
        setError(`File size must be less than ${maxFileSizeKB}KB`);
        return false;
      }
      return true;
    },
    [maxFileSizeKB]
  );

  const onSelectFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!checkFileSize(file)) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result?.toString() || "";
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          if (error) setError("");
          if (
            img.naturalWidth < MIN_DIMENSION ||
            img.naturalHeight < MIN_DIMENSION
          ) {
            setError(
              `Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`
            );
            return setImgSrc("");
          }
          setImgSrc(imageUrl);
        };
      };
      reader.readAsDataURL(file);
    },
    [error, MIN_DIMENSION, checkFileSize]
  );

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

      const newCrop = makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
      );
      setCrop(centerCrop(newCrop, width, height));
    },
    [ASPECT_RATIO, MIN_DIMENSION]
  );

  const handleUploadImage = useCallback(async () => {
    if (!imgRef.current || !previewCanvasRef.current || !crop) return;

    setIsLoading(true);
    try {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );

      let dataUrl = previewCanvasRef.current.toDataURL("image/jpeg", 0.9);

      if (maxFileSizeKB) {
        dataUrl = await compressImage(dataUrl, 0.7);

        const sizeInBytes = Math.floor((dataUrl.length * 3) / 4);
        if (sizeInBytes > maxFileSizeKB * 1024) {
          dataUrl = await compressImage(dataUrl, 0.5);
        }
      }

      const downloadURL = await handleUpload(dataUrl);
      onPickImage(downloadURL);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [crop, onPickImage, maxFileSizeKB]);

  const handleClearImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setImgSrc("");
      if (onClearImage) {
        onClearImage();
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setError("");
      setCrop(undefined);
    },
    [onClearImage]
  );

  if (!session) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="relative w-14 h-14" onClick={handleClearImage}>
          <Flex
            align="center"
            justify="center"
            className="w-full h-full rounded-md overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all border cursor-pointer"
          >
            {image ? (
              <>
                <NextImage
                  src={image}
                  width={56}
                  height={56}
                  alt="Uploaded preview"
                  className="w-14 h-14 object-cover"
                  priority
                />
                <button
                  onClick={handleClearImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <Camera className="text-primary/50" />
            )}
          </Flex>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          {imgSrc && (
            <div className="relative">
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <NextImage
                  ref={imgRef}
                  src={imgSrc}
                  alt="Upload"
                  width={500}
                  height={500}
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>

              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <BeatLoader color="#fff" />
                </div>
              )}
            </div>
          )}

          <canvas
            ref={previewCanvasRef}
            className="hidden"
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: MIN_DIMENSION,
              height: MIN_DIMENSION / ASPECT_RATIO,
            }}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={isLoading || !imgSrc}
            onClick={handleUploadImage}
          >
            {isLoading ? <BeatLoader color="#fff" size={8} /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
