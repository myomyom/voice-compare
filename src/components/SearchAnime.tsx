/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, List, ListItem } from "@mui/material";
import { SearchBox, ColorButton } from "./SearchBox";
import { useState } from "react";
import type { Media } from "../utils/types";

export default function SearchAnime() {
  const [media1, setMedia1] = useState<Media | null>(null);
  const [media2, setMedia2] = useState<Media | null>(null);

  const handleCompare = () => {
    console.log("Media 1:", media1);
    console.log("Media 2:", media2);
    for (const [key, value] of Object.entries(media1!)) {
      console.log(key, value)
    }
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
        <ListItem>{media1?.title.english}</ListItem>
        <ListItem>{media2?.title.english}</ListItem>
      </List>
    </>
  );
}
