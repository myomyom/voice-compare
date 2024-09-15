/* eslint-disable react/prop-types */
import CompareAnime from "./CompareAnime";
import { useState } from "react";
import GetAnime from "./GetAnime";
import { Container, Typography } from "@mui/material";

export default function GetAndCompareContainer({ mediaA, mediaB }) {
  const [vaMap1, setVAMap1] = useState(new Map());
  const [vaMap2, setVAMap2] = useState(new Map());

  function handleVAMap(searchID, m) {
    switch (searchID) {
      case 1:
        setVAMap1(new Map(m));
        break;
      case 2:
        setVAMap2(new Map(m));
        break;
      default:
        console.log("hihi");
        break;
    }
  }

  return (
    <Container>
      {/* TODO: add option to change language */}
      <GetAnime
        searchID={1}
        animeId={mediaA}
        animeLanguage={"JAPANESE"}
        sendVAMap={handleVAMap}
      />
      <GetAnime
        searchID={2}
        animeId={mediaB}
        animeLanguage={"JAPANESE"}
        sendVAMap={handleVAMap}
      />
      {vaMap1.size > 0 && vaMap2.size > 0 ? (
        <CompareAnime mediaA={vaMap1} mediaB={vaMap2} />
      ) : (
        <Typography variant="h6">
          Either one of both anime have no actors listed on Anilist.
        </Typography>
      )}
    </Container>
  );
}
