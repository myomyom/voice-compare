import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_SEARCH, GET_ANIME } from "../utils/scripts";
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
  IconButton,
  Button,
  styled,
  type ButtonProps,
} from "@mui/material";
import type {
  CharacterConnection,
  Media,
  MediaThumbnail,
} from "../utils/types";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";

export function LoadingBox() {
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

const createNewMedia = () => {
  return {
    __typename: "",
    id: 0,
    title: {
      __typename: "",
      english: "",
      romaji: "",
      native: "",
    },
    coverImage: {
      __typename: "",
      large: "",
      medium: "",
    },
    page1: {
      __typename: "",
      pageInfo: {
        __typename: "",
        currentPage: 0,
        hasNextPage: false,
      },
      edges: [],
    },
  };
};

type SearchResultsProps = {
  media: MediaThumbnail[];
  onSelect: (media: Media) => void;
};
export function SearchResults({ media, onSelect }: SearchResultsProps) {
  const [loadQuery, { data }] = useLazyQuery(GET_ANIME);
  const [res, setRes] = useState<Media>(createNewMedia());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    if (data) {
      let m: Media = createNewMedia();

      m.id = data.Media.id;
      m.title = data.Media.title;
      m.coverImage = data.Media.coverImage;
      m.page1 = data.Media.page1;

      for (const [key, value] of Object.entries(data.Media)) {
        if (key.startsWith("page") && key !== "page1") {
          const val = value as CharacterConnection;
          m = {
            ...m,
            page1: {
              ...m.page1,
              edges: [...m.page1.edges, ...val.edges],
            },
          };
        }
      }
      setRes(m);
    }
  }, [data]);

  useEffect(() => {
    if (res) {
      onSelect(res);
    }
  }, [res, onSelect]);

  function handleClick(id: number) {
    try {
      setSelectedId(id);
      loadQuery({ variables: { id: id } });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <List
      sx={{
        width: {
          xs: "18ch",
          sm: "30ch",
          md: "35ch",
          lg: "40ch",
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
              selected={m.id === selectedId}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(m.id);
              }}
              sx={{
                "&.Mui-selected": { bgcolor: "#f500572e" },
                "&.Mui-selected:hover": { bgcolor: "#f500572e" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={m.coverImage.medium}
                  variant="square"
                  sx={{
                    width: 50,
                    height: "auto",
                    marginRight: { xs: 0, sm: 2 },
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                slotProps={{
                  primary: { fontSize: 16 },
                }}
              >
                {m.title.english ?? m.title.romaji ?? m.title.native}
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}

type SearchBoxProps = {
  label: string;
  onSelectMedia: (media: Media) => void;
};

export function SearchBox({ label, onSelectMedia }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const [loadQuery, { called, loading, error, data }] =
    useLazyQuery(GET_ANIME_SEARCH);

  const mediaList: MediaThumbnail[] = data?.Page?.media ?? [];

  const handleSelect = (media: Media) => {
    onSelectMedia(media);
  };

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
      {mediaList.length > 0 && (
        <SearchResults media={mediaList} onSelect={handleSelect} />
      )}
    </Box>
  );
}

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#f50057"),
  backgroundColor: "#f50057",
  "&:hover": {
    backgroundColor: "#ff4c8bff",
  },
}));
