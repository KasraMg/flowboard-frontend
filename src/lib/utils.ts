import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const backgrounds: Record<string, string> = {
  ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  sunset: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
  purple: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
  forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  fire: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
  sky: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
};

export function getBackground(colorName: string) {
  return backgrounds[colorName] ?? backgrounds.ocean;
}
