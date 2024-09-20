/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function SelectedMedia({ title, image }) {
  return (
    <Grid
      sx={{
        display: { xs: "none", ml: "block" },
        width: { ml: 160, lg: 200, xl: 250, xxl: 300 },
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{
          width: "100%",
        }}
      />
      <Typography
        sx={{
          width: "100%",
          fontSize: { lg: 14, xl: 16, xxl: 22 },
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
}
