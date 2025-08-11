import { gql } from "@apollo/client";

export const GET_ANIME_SEARCH = gql`
  query ($title: String) {
    Page {
      media: media(search: $title, type: ANIME) {
        id
        title {
          english
          romaji
        }
        coverImage {
          medium
          large
        }
      }
    }
  }
`;
