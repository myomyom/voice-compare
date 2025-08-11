export type Page = {
  __typename: string;
  media: MediaThumbnail[];
};

export type MediaThumbnail = {
  __typename: string;
  id: number;
  title: { english: string; romaji: string; native: string };
  coverImage: {
    large: string;
    medium: string;
  };
};