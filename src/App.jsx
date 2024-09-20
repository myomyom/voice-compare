import { Button, Stack } from "@mui/material";
import "./App.css";
import Search from "./components/Search";
import TopBar from "./components/TopBar";
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
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300,
      sm: 600,
      md: 750,
      ml: 900,
      lg: 1200,
      xl: 1500,
      xxl: 1800,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1}>
        <TopBar />
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
