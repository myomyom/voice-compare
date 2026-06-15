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

export const GET_ANIME = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
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
        }
      }
      voiceActors(language: JAPANESE) {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  }
`;
