/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Stack, TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import GetAnime from "./GetAnime";

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
      sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        value={term}
        placeholder="Search..."
        onChange={handleChange}
      />
    </Box>
  );
}

export default function SearchBar({ searchID, sendToParent }) {
  const [newTerm, setNewTerm] = useState("");
  const [mediaID, setMediaID] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (newTerm) {
      setShouldLoad(true);
    } else {
      setShouldLoad(false);
    }
  }, [newTerm]);

  function handleMediaID(mId) {
    setMediaID(mId);
    sendToParent(mId);
  }

  return (
    <Stack>
      <Input setNewTerm={setNewTerm} />
      {shouldLoad ? (
        <>
          {/* <h1>SearchBar: {searchID}</h1> */}
          <SearchResults
            value={newTerm}
            searchID={searchID}
            sendMediaIDToParent={handleMediaID}
          />
        </>
      ) : (
        <div>No search term entered.</div>
      )}
      {mediaID && (
        <GetAnime
          animeId={mediaID}
          animeLanguage={"JAPANESE"}
          searchID={searchID}
          sendVAMap={() => {}}
        />
      )}
    </Stack>
  );
}
