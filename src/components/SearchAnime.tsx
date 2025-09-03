/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, List, ListItem } from "@mui/material";
import { SearchBox, ColorButton } from "./SearchBox";
import { useState } from "react";
import type {
  // Chara,
  CharacterConnection,
  Media,
  VARoles,
} from "../utils/types";

// character list with VA ids
// const setCharas = (media: Media): Chara[] => {
//   let charas: Chara[] = [];
//   for (const [key, value] of Object.entries(media)) {
//     const val = value as CharacterConnection;
//     if (key == "page1") {
//       charas = val.edges.map((e) => ({
//         character: e.node,
//         vaIds: e.voiceActors.map((va) => va.id),
//       }));
//     }
//   }
//   console.log("charas:", charas);
//   return charas;
// };

// merged VA list
const mapVARoles = (media: Media): Map<number, VARoles> => {
  const vaMap = new Map<number, VARoles>();
  for (const [key, value] of Object.entries(media)) {
    if (key == "page1") {
      const val = value as CharacterConnection;
      val.edges.forEach((e) => {
        e.voiceActors.forEach((va) => {
          if (!vaMap.has(va.id)) {
            vaMap.set(va.id, {
              id: va.id,
              name: va.name.full,
              img: va.image.large,
              characters: [e.node],
            });
          } else {
            vaMap.get(va.id)!.characters.push(e.node);
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

  let vaMap1 = new Map<number, VARoles>();

  const handleCompare = () => {
    vaMap1 = mapVARoles(media1!);
    console.log("vaMap1:", vaMap1);
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
        <ListItem>{media1?.title.english || media1?.title.romaji}</ListItem>
        <ListItem>{media2?.title.english || media2?.title.romaji}</ListItem>
      </List>
    </>
  );
}
