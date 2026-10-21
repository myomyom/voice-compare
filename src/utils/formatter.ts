import type { MediaThumbnail } from "./types";

export const mediaTitle = (media: MediaThumbnail, titleLanguage: string) => {
    switch (titleLanguage) {
      case "Romaji":
        return media.title.romaji;
      case "English":
        return media.title.english ?? media.title.romaji;
      case "Native":
        return media.title.native;
      default:
        return media.title.userPreferred;
    }
  };