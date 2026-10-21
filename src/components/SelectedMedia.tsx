import { Box, Grid, Typography } from "@mui/material";
import type { Media } from "../utils/types";
import { mediaTitle } from "../utils/formatter";

export default function SelectedMedia({ media, titleLanguage }: { media: Media | null, titleLanguage: string }) {
  if (!media?.coverImage.large) return null;

  return (
    <Grid
      sx={{
        position: "sticky",
        top: "2em",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: 200,
      }}
    >
      <Box
        component="img"
        src={media.coverImage.large}
        sx={{
          width: "100%",
        }}
      />
      <Typography
        sx={{
          width: "100%",
          fontSize: 16,
          marginTop: "0.5em",
        }}
      >
        {mediaTitle(media, titleLanguage)}
      </Typography>
    </Grid>
  );
}
