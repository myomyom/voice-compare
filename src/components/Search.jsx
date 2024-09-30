/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Grid2";
import GetAndCompareContainer from "./GetAndCompareContainer";
import SelectedMedia from "./SelectedMedia";

export default function Search() {
  const [containerID1, setContainerID1] = useState(null);
  const [containerID2, setContainerID2] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [titleImage1, setTitleImage1] = useState([]);
  const [titleImage2, setTitleImage2] = useState([]);

  useEffect(() => {
    if (containerID1 !== null && containerID2 !== null) {
      setShouldLoad(true);
    }
  }, [containerID1, containerID2]);

  function handleTitleImage(searchID, m) {
    switch (searchID) {
      case 1:
        setTitleImage1(m);
        break;
      case 2:
        setTitleImage2(m);
        break;
      default:
        console.log("error, wrong searchID");
        break;
    }
  }

  function idForContainer(searchID, containerID) {
    if (searchID === 1) {
      setContainerID1(containerID);
    }
    if (searchID === 2) {
      setContainerID2(containerID);
    }
  }

  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid
          sx={{
            position: "fixed",
            left: { ml: "2em", lg: "3em", xl: "6em", xxl: "9em" },
            top: { ml: "30%" },
          }}
        >
          <SelectedMedia
            title={titleImage1[0] ? titleImage1[0] : ""}
            image={titleImage1[1]}
          />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchBar
            searchID={1}
            sendToParent={(id) => idForContainer(1, id)}
            sendTitleImageAgain={(i) => handleTitleImage(1, i)}
          />
          <SearchBar
            searchID={2}
            sendToParent={(id) => idForContainer(2, id)}
            sendTitleImageAgain={(i) => handleTitleImage(2, i)}
          />
        </Grid>
        <Grid
          sx={{
            position: "fixed",
            right: { ml: "2em", lg: "3em", xl: "6em", xxl: "9em" },
            top: { ml: "30%" },
          }}
        >
          <SelectedMedia
            title={titleImage2[0] ? titleImage2[0] : ""}
            image={titleImage2[1]}
          />
        </Grid>
      </Grid>
      {shouldLoad ? (
        <GetAndCompareContainer mediaA={containerID1} mediaB={containerID2} />
      ) : null}
    </>
  );
}
