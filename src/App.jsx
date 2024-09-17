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
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 700,
    //     md: 900,
    //     lg: 1100,
    //     xl: 1300,
    //   },
    // },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1}>
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
