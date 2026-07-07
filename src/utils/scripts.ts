import { gql } from "@apollo/client";

export const GET_ANIME_SEARCH = gql`
  query ($title: String) {
    Page {
      media: media(search: $title, type: ANIME) {
        id
        title {
          english
          romaji
          native
        }
        coverImage {
          medium
          large
        }
      }
    }
  }
`;

export const GET_ANIME = (language: string) => {
  const voiceActorsArg = language ? `(language: ${language})` : "";
  return gql`query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      coverImage {
        medium
        large
      }
      page1: characters(page: 1) {
        ...comparisonFields
      }
      page2: characters(page: 2) {
        ...comparisonFields
      }
      page3: characters(page: 3) {
        ...comparisonFields
      }
      page4: characters(page: 4) {
        ...comparisonFields
      }
      page5: characters(page: 5) {
        ...comparisonFields
      }
      page6: characters(page: 6) {
        ...comparisonFields
      }
      page7: characters(page: 7) {
        ...comparisonFields
      }
      page8: characters(page: 8) {
        ...comparisonFields
      }
      page9: characters(page: 9) {
        ...comparisonFields
      }
      page10: characters(page: 10) {
        ...comparisonFields
      }
    }
  }

  fragment comparisonFields on CharacterConnection {
    pageInfo {
      currentPage
      hasNextPage
    }
    edges {
      node {
        image {
          large
        }
        id
        name {
          full
          native
        }
      }
      voiceActors${voiceActorsArg} {
        id
        name {
          full
          native
        }
        image {
          large
        }
      }
    }
  }`;
};

export const TITLE_LANGUAGE = ["Romaji", "English", "Native"];

export const DEFAULT_TITLE_LANGUAGE = "English";
export const DEFAULT_VOICE_LANGUAGE = "Japanese";

export const VOICE_LANGUAGE = [
  "Japanese",
  "English",
  "Korean",
  "Italian",
  "Spanish",
  "Portuguese",
  "French",
  "German",
  "Hebrew",
  "Hungarian",
];
