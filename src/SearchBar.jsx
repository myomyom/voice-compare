/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Stack, TextField } from "@mui/material";
import SearchResults from "./SearchResults";

function Input({ setNewTerm }) {
  const [term, setTerm] = useState("");

  function handleChange(e) {
    setTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewTerm(term);
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" } }}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        value={term}
        placeholder="Search Anime Title..."
        onChange={handleChange}
      />
    </Box>
  );
}

export default function SearchBar({
  searchID,
  sendToParent,
  sendTitleImageAgain,
}) {
  const [newTerm, setNewTerm] = useState("");
  const [mediaID, setMediaID] = useState(null);
  const [titleImage, setTitleImage] = useState([]);

  useEffect(() => {
    sendToParent(mediaID);
    console.log(mediaID);
    console.log(searchID);
    sendTitleImageAgain(titleImage);
  }, [mediaID, searchID]);

  function handleMediaID(mId) {
    setMediaID(mId);
  }

  function handleTitleImage(tId) {
    console.log("titleImage", tId);
    setTitleImage(tId);
    // console.log(tId);
  }

  return (
    <Stack sx={{ my: 1 }}>
      <Input setNewTerm={setNewTerm} />
      <SearchResults
        value={newTerm}
        display={newTerm ? "block" : "none"}
        searchID={searchID}
        sendMediaIDToParent={handleMediaID}
        sendTitleImage={handleTitleImage}
      />
    </Stack>
  );
}
