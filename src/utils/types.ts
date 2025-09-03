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

export type Media = {
  __typename: string;
  id: number;
  title: {
    __typename: string;
    english: string;
    romaji: string;
    native: string;
  };
  coverImage: {
    __typename: string;
    large: string;
    medium: string;
  };
  [key: `page${number}`]: CharacterConnection;
};

export type CharacterConnection = {
  __typename: string;
  pageInfo: PageInfo;
  edges: CharacterEdge[];
};

export type PageInfo = {
  __typename: string;
  currentPage: number;
  hasNextPage: boolean;
};

export type CharacterEdge = {
  __typename: string;
  node: Character;
  voiceActors: Staff[];
};

export type Character = {
  __typename: string;
  id: number;
  name: {
    __typename: string;
    full: string;
  };
  image: {
    __typename: string;
    large: string;
  };
};

export type Staff = {
  __typename: string;
  id: number;
  name: {
    __typename: string;
    full: string;
  };
  image: {
    __typename: string;
    large: string;
  };
};
