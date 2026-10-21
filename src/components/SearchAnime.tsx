import { Container, Grid } from "@mui/material";
import { SearchBox } from "./SearchBox";
import { useEffect, useState } from "react";
import type { CharacterConnection, Media, VARoles } from "../utils/types";
import CharacterResult from "./CharacterResult";
import SelectedMedia from "./SelectedMedia";

const mapVARoles = (media: Media, order: number): Map<number, VARoles> => {
  const vaMap = new Map<number, VARoles>();
  for (const [key, value] of Object.entries(media)) {
    if (key == "page1") {
      const val = value as CharacterConnection;
      val.edges.forEach((e) => {
        e.voiceActors.forEach((va) => {
          if (!vaMap.has(va.id)) {
            vaMap.set(va.id, {
              id: va.id,
              staff: e.voiceActors.find((v) => v.id == va.id)!,
              characters1: order == 1 ? [e.node] : [],
              characters2: order == 2 ? [e.node] : [],
            });
          } else {
            if (order == 1) {
              vaMap.get(va.id)!.characters1.push(e.node);
            }
            if (order == 2) {
              vaMap.get(va.id)!.characters2.push(e.node);
            }
          }
        });
      });
    }
  }
  return vaMap;
};

const compareMedia = (mediaA: Media, mediaB: Media): Map<number, VARoles> => {
  const vaMap1 = mapVARoles(mediaA, 1);
  const vaMap2 = mapVARoles(mediaB, 2);
  vaMap2.forEach((value, key) => {
    if (vaMap1.has(key)) {
      const charas = vaMap1.get(key)?.characters1;
      if (charas) value.characters1.push(...charas);
      vaMap1.set(key, { ...vaMap1.get(key), ...value });
    } else {
      vaMap1.set(key, value);
    }
  });

  const vaRes = new Map<number, VARoles>();
  vaMap1.forEach((value, key) => {
    if (
      vaMap1.get(key)?.characters1.length !== 0 &&
      vaMap1.get(key)?.characters2.length !== 0
    ) {
      vaRes.set(key, value);
    }
  });
  return vaRes;
};

type SearchAnimeProps = {
  titleLanguage: string;
  voiceLanguage: string;
};

export default function SearchAnime({
  titleLanguage,
  voiceLanguage,
}: SearchAnimeProps) {
  const [media1, setMedia1] = useState<Media | null>(null);
  const [media2, setMedia2] = useState<Media | null>(null);
  const [comparisonResult, setComparisonResult] = useState<Map<
    number,
    VARoles
  > | null>(null);

  useEffect(() => {
    if (!media1 || !media2) return;
    setComparisonResult(compareMedia(media1, media2));
  }, [media1, media2]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        gap: { ml: 2, xl: 4, xxl: 6 },
      }}
    >
      <SelectedMedia media={media1} titleLanguage={titleLanguage} />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <SearchBox
            label="Search Anime 1..."
            onSelectMedia={setMedia1}
            titleLanguage={titleLanguage}
            voiceLanguage={voiceLanguage}
          />
          <SearchBox
            label="Search Anime 2..."
            onSelectMedia={setMedia2}
            titleLanguage={titleLanguage}
            voiceLanguage={voiceLanguage}
          />
        </Grid>
        <Container sx={{ padding: "2em" }}>
          <CharacterResult
            idMedia1={media1?.id}
            idMedia2={media2?.id}
            comparisonResult={comparisonResult}
            titleLanguage={titleLanguage}
          />
        </Container>
      </Grid>
      <SelectedMedia media={media2} titleLanguage={titleLanguage} />
    </Grid>
  );
}
