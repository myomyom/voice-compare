import { Button, Stack, Typography } from "@mui/material";
import "./App.css";
import Search from "./Search";
// import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f50057",
    },
    secondary: {
      main: "#fafafa",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Outfit",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1}>
        <Typography variant="h2">Voice Compare</Typography>
        <Typography variant="h6">
          Compare voice actors in anime! Uses{" "}
          <a
            href="https://anilist.gitbook.io/anilist-apiv2-docs"
            style={{ textDecoration: "none", color: "#f50057" }}
          >
            Anilist API.
          </a>
        </Typography>
        <Search />
        <Button
          secondary
          href="https://github.com/myomyom/voice-compare"
          sx={{ width: 100 }}
        >
          by myo 🐟
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
