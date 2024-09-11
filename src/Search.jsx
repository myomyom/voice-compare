/* eslint-disable react/prop-types */

import SearchBar from "./SearchBar";
import { Container } from "@mui/material";
import { useState, useEffect } from "react";

import Pain from "./Pain";

export default function Search() {
  const [foodA, setFoodA] = useState(null);
  const [foodB, setFoodB] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (foodA !== null && foodB !== null) {
      setShouldLoad(true);
    }
  }, [foodA, foodB]);

  function breadFood(searchID, food) {
    if (searchID === 1) {
      setFoodA(food);
    }
    if (searchID === 2) {
      setFoodB(food);
    }
  }

  // console.log("FOOD A", foodA);
  // console.log("FOOD B", foodB);

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <SearchBar searchID={1} sendToParent={(id) => breadFood(1, id)} />
        <SearchBar searchID={2} sendToParent={(id) => breadFood(2, id)} />
      </Container>
      {shouldLoad ? <Pain mediaA={foodA} mediaB={foodB} /> : null}
    </>
  );
}
