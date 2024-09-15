/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const GET_ANIME_SEARCH = gql`
  query ($title: String) {
    page: Page {
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

function ListItemLink({ primary, secondary, src, onClick }) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          src={src}
          variant="square"
          sx={{ width: 100, height: "auto", marginRight: "1em" }}
        />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} onClick={onClick} />
    </ListItemButton>
  );
}

export default function SearchResults({
  value,
  searchID,
  sendMediaIDToParent,
  sendTitleImage,
}) {
  const [myId, setMyId] = useState(null);
  const [searchResultId, setSearchResultId] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");

  const { loading, error, data } = useQuery(GET_ANIME_SEARCH, {
    variables: { title: value },
  });

  useEffect(() => {
    sendTitleImage([title, thumbnail]);
    sendMediaIDToParent(myId);
  }, [myId, title, thumbnail]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: 250,
          width: "auto",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error : {error.message}</p>;
  const showMedia = ({ page: { media } }) => {
    const mediaList = [];
    const titleList = (m) => {
      m.map((v) =>
        mediaList.push([
          v.id,
          v.title.english ? v.title.english : v.title.romaji,
          v.coverImage.large ? v.coverImage.large : v.coverImage.medium,
        ])
      );
      return mediaList.map((v) => (
        <React.Fragment key={v[0]}>
          <ListItem sx={{ width: "40ch" }}>
            <ListItemLink
              primary={v[1]}
              secondary={v[0]}
              src={v[2]}
              onClick={(e) => {
                e.stopPropagation();
                setMyId(v[0]);
                setSearchResultId(searchID); // id of the searchbar. 1 = left 2 = right
                setTitle(v[1]);
                setThumbnail(v[2]);
              }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ));
    };

    return (
      <>
        <List
          sx={{
            width: "100%",
            maxHeight: 250,
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {titleList(media)}
        </List>
      </>
    );
  };

  return <>{showMedia(data)}</>;
}
