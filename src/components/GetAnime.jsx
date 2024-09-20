/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";

// anilist API doesn't support cursor pagination so query 10 pages manually
const GET_ANIME = gql`
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

export default function GetAnime({
  animeId,
  animeLanguage,
  searchID,
  sendVAMap,
}) {
  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { id: animeId, language: animeLanguage },
  });
  const vaMap = new Map();
  useEffect(() => {
    if (!loading && data) {
      const media = data.Media;

      const mergedMedia = [];

      for (const x of Object.entries(media)) {
        if (x[0].startsWith("page")) {
          mergedMedia.push(...x[1].edges);
        }
      }

      const vaList = (o) => {
        o.forEach((m) => {
          m.voiceActors && m.voiceActors.length > 0
            ? m.voiceActors.map((va) =>
                vaMap.set(va.id, [
                  [va.id, va.name.full, va.image.large],
                  [m.node.id, m.node.name.full, m.node.image.large],
                ])
              )
            : "null";
        });
      };

      // two voice actors for one character works already ex : enstars (hokuto teen & child versions) + golden kamuy s4 (kirawus & enonoka)
      // TODO: vaList loop again if one VA voices two characters (ex haro = chuchu = same VA), make sth like
      // [va.id, [[node1], [node2]]];
      // [va.id, [[CHUCHU], [HARO]]];
      // so far the characters got replaced with the 2nd character, ex: chuchu's VA only gets haro and not chuchu

      vaList(mergedMedia);
      sendVAMap(searchID, vaMap);
      // console.log("VA MAP", searchID, vaMap);
      return () => {
        vaMap.length = 0;
      };
    }
  }, [loading, data]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "auto",
          width: "auto",
          my: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <p>Error : {error.message}</p>;
}
