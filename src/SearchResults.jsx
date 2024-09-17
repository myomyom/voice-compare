/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Avatar,
  Box,
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

function ListItemLink({ primary, src, onClick }) {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          src={src}
          variant="square"
          sx={{
            width: { xs: 50, sm: 50, md: 75, lg: 100, xl: 120 },
            height: "auto",
            // height: { xs: 25, sm: 50, md: 75, lg: 100 },
            marginRight: "1em",
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={primary}
        onClick={onClick}
        primaryTypographyProps={{
          fontSize: { xs: 12, sm: 15, xl: 18 },
        }}
      />
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
          my: 2,
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
          <ListItem>
            <ListItemLink
              primary={v[1]}
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
            width: {
              xs: "24ch",
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
          {titleList(media)}
        </List>
      </>
    );
  };

  return <>{showMedia(data)}</>;
}
