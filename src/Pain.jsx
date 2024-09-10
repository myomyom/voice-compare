/* eslint-disable react/prop-types */
import CompareAnime from "./CompareAnime";
import { useState } from "react";
import GetAnime from "./GetAnime";

export default function Pain({ mediaA, mediaB }) {
  const [vaMap1, setVAMap1] = useState(new Map());
  const [vaMap2, setVAMap2] = useState(new Map());
  console.log("bread");

  function handleDeezNuts(hihihi) {
    console.log("deez nuts", hihihi);
  }

  function handleVAMap(searchID, m) {
    // console.log("m", m);
    switch (searchID) {
      case 1:
        setVAMap1(new Map(m));
        break;
      case 2:
        setVAMap2(new Map(m));
        break;
      default:
        console.log("hihi");
        break;
    }
  }
  // console.log("vaMap1", vaMap1, "vaMap2", vaMap2);
  return (
    <>
      <p>bread..</p>
      {/* TODO: add option to change language */}
      <GetAnime
        searchID={1}
        animeId={mediaA}
        animeLanguage={"JAPANESE"}
        sendVAMap={handleVAMap}
      />
      <GetAnime
        searchID={2}
        animeId={mediaB}
        animeLanguage={"JAPANESE"}
        sendVAMap={handleVAMap}
      />
      {vaMap1.size > 0 && vaMap2.size > 0 ? (
        <CompareAnime
          mediaA={vaMap1}
          mediaB={vaMap2}
          deezNuts={handleDeezNuts}
        />
      ) : (
        <div>Both maps are empty, unable to compare.</div>
      )}
    </>
  );
}
