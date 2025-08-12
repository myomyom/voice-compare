import SearchAnime from "./components/SearchAnime";
import { Button, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./components/TopBar";
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
      lg: 1200,
      xl: 1500,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1} height={"90vh"}>
        <TopBar />
        <SearchAnime />
      </Stack>
      <Button
        href="https://github.com/myomyom/voice-compare"
        sx={{ width: 100, marginTop: 2 }}
      >
        by myo 🐟
      </Button>
    </ThemeProvider>
  );    
}
