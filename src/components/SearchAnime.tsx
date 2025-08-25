import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH } from "../utils/scripts";
import {
  ListItem,
  Divider,
  List,
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Grid,
  IconButton,
  Button,
  styled,
  type ButtonProps,
} from "@mui/material";
import type { MediaThumbnail } from "../utils/types";
import { useState } from "react";
import { Search } from "@mui/icons-material";

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
  function handleClick(id: number) {
    console.log("click!", id);
  }
  return (
    <List
      sx={{
        width: {
          xs: "18ch",
          sm: "30ch",
          md: "35ch",
          lg: "40ch",
          xl: "50ch",
        },
        maxHeight: { xs: 125, md: 250 },
        alignItems: "center",
        overflow: "auto",
      }}
    >
      {media.map((m) => (
        <div key={m.id}>
          <ListItem>
            <ListItemButton
              onClick={(e) => {
                e.stopPropagation();
                handleClick(m.id)
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={m.coverImage.medium}
                  variant="square"
                  sx={{
                    width: { xs: 25, sm: 50, md: 75, lg: 100, xl: 120 },
                    height: "auto",
                    marginRight: { xs: 0, sm: 2 },
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: { fontSize: { xs: 10, sm: 15, xl: 18 } },
                }}
              >
                {m.title.english ?? m.title.romaji}
              </ListItemText>
            </ListItemButton>
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
          placeholder={label}
          sx={{
            width: {
              xs: "18ch",
              sm: "30ch",
              md: "35ch",
              lg: "40ch",
              xl: "50ch",
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="submit" color="primary" edge="end">
                  <Search />
                </IconButton>
              ),
            },
          }}
        />
      </form>
      {error && <Typography color="error">Error! {error.message}</Typography>}
      {called && loading && <LoadingBox />}
      {mediaList.length > 0 && <SearchResults media={mediaList} />}
    </Box>
  );
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#f50057"),
  backgroundColor: "#f50057",
  "&:hover": {
    backgroundColor: "#ff4c8bff",
  },
}));

export default function SearchAnime() {
  return (
    <>
      <Grid
        spacing={{ xs: 1, sm: 2 }}
        container
        sx={{ justifyContent: "center" }}
      >
        <SearchBox label="Search Anime 1..." />
        <SearchBox label="Search Anime 2..." />
      </Grid>
      <ColorButton
        variant="contained"
        sx={{
          width: "15em",
          height: "3rem",
          fontSize: "20px",
        }}
        disableElevation
      >
        Compare
      </ColorButton>
    </>
  );
}
