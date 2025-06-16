import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleUpload = async (dataUrl: string): Promise<string> => {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Create a unique filename with timestamp
    const filename = `products/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    // Upload the blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: "image/jpeg", // Set content type
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Upload failed");
  }
};
