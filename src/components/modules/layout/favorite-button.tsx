"use client";
import { useToggleFavorite } from "@/src/hooks/useFavorite";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

const FavoriteButton = ({
  isFavorite,
  projectId,
}: {
  isFavorite: boolean;
  projectId: number;
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { mutate } = useToggleFavorite(projectId);
  return (
    <Button
      onClick={() => {
        if (favorite) {
          mutate();
          setFavorite(false);
        } else {
          mutate();
          setFavorite(true);
        }
      }}
      className="group"
      variant={"secondary"}
    >
      {favorite ? (
        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 stroke-yellow-400" />
      ) : (
        <Star className="h-5 w-5 group-hover:fill-yellow-400 group-hover:stroke-yellow-400 transition-colors" />
      )}
    </Button>
  );
};

export default FavoriteButton;
