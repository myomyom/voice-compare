import { Grid } from "@mui/material";
import { SearchBox, ColorButton } from "./SearchBox";

export default function SearchAnime() {
  const idk = () => {
    return console.log("ok");
  };
  return (
    <>
      <Grid
        spacing={{ xs: 1, sm: 2 }}
        container
        sx={{ justifyContent: "center" }}
      >
        <SearchBox label="Search Anime 1..." />
        <SearchBox label="Search Anime 2..." />
      </Grid>
      <ColorButton
        variant="contained"
        sx={{
          width: "15em",
          height: "3rem",
          fontSize: "20px",
        }}
        disableElevation
        onClick={() => idk()}
      >
        Compare
      </ColorButton>
    </>
  );
}
