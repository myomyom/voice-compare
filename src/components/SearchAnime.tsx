import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH } from "../utils/scripts";
import {
  ListItem,
  Divider,
  List,
  Avatar,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import type { MediaThumbnail } from "../utils/types";
import { useState } from "react";

function LoadingBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: { xs: 125, md: 250 },
        width: "auto",
        my: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

function SearchResults({ media }: { media: MediaThumbnail[] }) {
  return (
    <List>
      {media.map((m) => (
        <div key={m.id}>
          <ListItem>
            <Avatar
              src={m.coverImage.medium}
              variant="square"
              sx={{ height: 100, width: 70, mr: 2 }}
            />
            {m.title.english ?? m.title.romaji}
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}

function SearchBox({ label }: { label: string }) {
  const [value, setValue] = useState("");

  const [loadQuery, { called, loading, error, data }] =
    useLazyQuery(GET_ANIME_SEARCH);

  const mediaList: MediaThumbnail[] = data?.Page?.media ?? [];

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6">{label}</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadQuery({ variables: { title: value } });
        }}
      >
        <TextField
          value={value}
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ mr: 1 }}
        />
        <Button variant="contained" type="submit">
          OK
        </Button>
      </form>

      {error && <Typography color="error">Error! {error.message}</Typography>}
      {called && loading && <LoadingBox />}
      {mediaList.length > 0 && <SearchResults media={mediaList} />}
    </Box>
  );
}

export default function SearchAnime() {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      sx={{ flexWrap: "wrap" }}
      width={1200}
      justifyContent={"center"}
    >
      <SearchBox label="Search 1" />
      <SearchBox label="Search 2" />
    </Stack>
  );
}
