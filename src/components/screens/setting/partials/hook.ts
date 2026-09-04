import { useUpdateAvatar } from "@/src/hooks/useUser";
import { useCallback, useState } from "react";
import { Area } from "react-easy-crop";

const useUserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
  ): Promise<Blob> => {
    const image = new Image();

    image.src = imageSrc;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not create canvas context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not create image blob"));
            return;
          }

          resolve(blob);
        },
        "image/webp",
        0.9,
      );
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setCrop({
      x: 0,
      y: 0,
    });
    setZoom(1);
    setCroppedAreaPixels(null);
    setOpen(true);

    event.target.value = "";
  };

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleClose = () => {
    if (isPending) return;

    setOpen(false);

    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setCrop({
      x: 0,
      y: 0,
    });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleUpload = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels);

      const file = new File([croppedBlob], "avatar.webp", {
        type: "image/webp",
      });

      const formData = new FormData();

      formData.append("avatar", file);

      updateAvatar(formData, {
        onSuccess: () => {
          handleClose();
        },
      });
    } catch (error) {
      console.error("Avatar upload failed:", error);
    }
  };

  return {
    open,
    handleFileChange,
    crop,
    zoom,
    setCrop,
    setZoom,
    handleCropComplete,
    image,
    handleClose,
    isPending,
    handleUpload,
    croppedAreaPixels,
  };
};

export default useUserAvatar;
