"use client";

import Cropper from "react-easy-crop";
import { Upload, X } from "lucide-react";
import { UserAvatar as UserAvatarCm } from "@/src/components/modules/user-avatar";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { User } from "@/src/lib/types";
import useUserAvatar from "./hook";

const UserAvatar = ({ user }: { user: User }) => {
  const {
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
  } = useUserAvatar();
  return (
    <>
      <div className="flex items-center gap-4">
        <UserAvatarCm user={user} size="xl" />

        <label>
          <Button type="button" variant="outline" size="sm" asChild>
            <span className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Change avatar
            </span>
          </Button>

          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            handleClose();
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Change avatar</DialogTitle>

            <DialogDescription>
              Adjust your image before uploading.
            </DialogDescription>
          </DialogHeader>

          {image && (
            <div className="space-y-5">
              <div className="relative h-80 w-full overflow-hidden rounded-xl bg-black">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Zoom</span>

                  <span className="text-sm text-muted-foreground">
                    {zoom.toFixed(1)}x
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={handleClose}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>

                <Button
                  type="button"
                  disabled={isPending || !croppedAreaPixels}
                  onClick={handleUpload}
                >
                  {isPending ? "Uploading..." : "Save avatar"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAvatar;
