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
        placeholder="Search Anime..."
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
    sendTitleImageAgain(titleImage);
  }, [mediaID, searchID]);

  function handleMediaID(mId) {
    setMediaID(mId);
  }

  function handleTitleImage(tId) {
    setTitleImage(tId);
  }

  return (
    <Stack sx={{ marginTop: 2 }}>
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
