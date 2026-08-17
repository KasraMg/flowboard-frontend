import { ProjectBackground } from "../hooks/useProject";

export const PROJECT_BACKGROUNDS: Record<ProjectBackground, string> = {
  [ProjectBackground.OCEAN]:
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

  [ProjectBackground.SUNSET]:
    "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",

  [ProjectBackground.PURPLE]:
    "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",

  [ProjectBackground.FOREST]:
    "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",

  [ProjectBackground.FIRE]:
    "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",

  [ProjectBackground.SKY]:
    "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
};