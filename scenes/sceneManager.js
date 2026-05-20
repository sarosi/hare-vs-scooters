export const SCENES = {
  MENU: "menu",
  GAME: "game"
};

export function createSceneManager() {
  return {
    current: SCENES.MENU
  };
}