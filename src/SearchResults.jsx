/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  // Card,
  // CardContent,
  // CardMedia,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  // Typography,
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

// // function SelectedMedia({ img, title }) {
// //   return (
// //     <Card variant="outlined" sx={{ width: 150, my: 1 }}>
// //       <CardMedia image={img} sx={{ height: 150 }} />
// //       <CardContent>
// //         <Typography>{title}</Typography>
// //       </CardContent>
// //     </Card>
// //   );
// // }

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
}) {
  // eslint-disable-next-line no-unused-vars
  const [myId, setMyId] = useState(null);
  const [searchResultId, setSearchResultId] = useState(null);
  const [display, setDisplay] = useState("block");
  //   const [thumbnail, setThumbnail] = useState("");
  //   const [title, setTitle] = useState("");
  const { loading, error, data } = useQuery(GET_ANIME_SEARCH, {
    variables: { title: value },
  });
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
    const title = (m) => {
      return m.map((v) => (
        <React.Fragment key={v.id}>
          <ListItem sx={{ width: "50ch" }}>
            <ListItemLink
              primary={v.title.english ? v.title.english : v.title.romaji}
              secondary={v.id}
              src={v.coverImage.medium}
              onClick={(e) => {
                e.stopPropagation();
                setMyId(v.id);
                setSearchResultId(searchID);
                sendMediaIDToParent(v.id);
                // console.log("media ID: ", v.id);
                // setThumbnail(v.coverImage.large);
                // setTitle(v.title.english ? v.title.english : v.title.romaji);
              }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ));
    };
    // console.log("myId: ", myId);
    return (
      <>
        <Button
          onClick={() =>
            display === "block" ? setDisplay("none") : setDisplay("block")
          }
        >
          close
        </Button>
        <List
          sx={{
            display: { display },
            width: "100%",
            maxHeight: 250,
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {title(media)}
        </List>
      </>
    );
  };

  return (
    <>
      {/* <SelectedMedia title={title} img={thumbnail} /> */}
      {showMedia(data)}
      {/* <p>{myId}</p> */}
    </>
  );
}
