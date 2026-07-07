import SearchAnime from "./components/SearchAnime";
import { Button, Grid, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./components/TopBar";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    ml: true;
    xxl: true;
  }
}
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
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 750,
      ml: 900,
      lg: 1200,
      xl: 1500,
      xxl: 1920,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1}>
        <TopBar />
        <SearchAnime />
      </Stack>
      <Grid container justifyContent="center">
        <Button
          href="https://github.com/myomyom/voice-compare"
          sx={{ width: 100, marginTop: 2 }}
          style={{ position: "absolute", bottom: 0, paddingBottom: 25}}
        >
          🐟
        </Button>
      </Grid>
    </ThemeProvider>
  );    
}
