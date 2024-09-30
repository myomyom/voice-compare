import { Typography } from "@mui/material";

export default function TopBar() {
  return (
    <>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "2em", sm: "3em", md: "4em" } }}
      >
        Voice Compare
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontSize: { xs: "0.8em", sm: "1em", md: "1.5em" } }}
      >
        Compare voice actors in anime! Uses{" "}
        <a
          href="https://anilist.gitbook.io/anilist-apiv2-docs"
          style={{ textDecoration: "none", color: "#f50057" }}
        >
          Anilist API.
        </a>
      </Typography>
    </>
  );
}
