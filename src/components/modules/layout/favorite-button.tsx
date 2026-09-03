"use client";
import { useToggleFavorite } from "@/src/hooks/useFavorite";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

const FavoriteButton = ({
  isFavorite,
  projectId,
  size = "default",
}: {
  isFavorite: boolean;
  projectId: number;
  size?: "default" | "sm";
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { mutate } = useToggleFavorite(projectId);
  return (
    <Button
      size={size}
      onClick={() => {
        if (favorite) {
          mutate();
          setFavorite(false);
        } else {
          mutate();
          setFavorite(true);
        }
      }}
      className="group/button"
      variant={"secondary"}
    >
      {favorite ? (
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 stroke-yellow-400" />
      ) : (
        <Star className="h-5 w-5 group-hover/button:fill-yellow-400 group-hover/button:stroke-yellow-400 transition-colors" />
      )}
    </Button>
  );
};

export default FavoriteButton;
