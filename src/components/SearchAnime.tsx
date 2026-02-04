// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid, List, ListItem } from "@mui/material";
import { SearchBox, ColorButton } from "./SearchBox";
import { useState } from "react";
import type { CharacterConnection, Media, VARoles } from "../utils/types";
import CharacterResult from "./CharacterResult";

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

export default function SearchAnime() {
  const [media1, setMedia1] = useState<Media | null>(null);
  const [media2, setMedia2] = useState<Media | null>(null);
  const [comparisonResult, setComparisonResult] = useState<Map<
    number,
    VARoles
  > | null>(null);

  let vaMap1 = new Map<number, VARoles>();
  let vaMap2 = new Map<number, VARoles>();
  let vaRes = new Map(vaMap1);

  const handleCompare = () => {
    vaMap1 = mapVARoles(media1!, 1);
    vaMap2 = mapVARoles(media2!, 2);
    vaMap2.forEach((value, key) => {
      if (vaMap1.has(key)) {
        const charas = vaMap1.get(key)?.characters1;
        if (charas) value.characters1.push(...charas);
        vaMap1.set(key, { ...vaMap1.get(key), ...value });
      } else {
        vaMap1.set(key, value);
      }
    });

    vaRes = new Map([]);
    vaMap1.forEach((value, key) => {
      if (
        vaMap1.get(key)?.characters1.length !== 0 &&
        vaMap1.get(key)?.characters2.length !== 0
      ) {
        vaRes.set(key, value);
      }
    });

    setComparisonResult(vaRes);
  };

  return (
    <>
      <Grid
        spacing={{ xs: 1, sm: 2 }}
        container
        sx={{ justifyContent: "center" }}
      >
        <SearchBox label="Search Anime 1..." onSelectMedia={setMedia1} />
        <SearchBox label="Search Anime 2..." onSelectMedia={setMedia2} />
      </Grid>
      <ColorButton
        variant="contained"
        sx={{
          width: "15em",
          height: "3rem",
          fontSize: "20px",
        }}
        disableElevation
        onClick={handleCompare}
      >
        Compare
      </ColorButton>
      <List>
        <ListItem>{media1?.title.english || media1?.title.romaji}</ListItem>{" "}
        <ListItem>{media2?.title.english || media2?.title.romaji}</ListItem>
      </List>
      <CharacterResult comparisonResult={comparisonResult} />
    </>
  );
}
