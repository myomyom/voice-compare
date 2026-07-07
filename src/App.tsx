import SearchAnime from "./components/SearchAnime";
import { Button, Grid, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import LanguageMenu from "./components/LanguageMenu";
import {
  DEFAULT_TITLE_LANGUAGE,
  DEFAULT_VOICE_LANGUAGE,
} from "./utils/scripts";
import React from "react";

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
  const [voiceLanguage, setVoiceLanguage] = React.useState(
    DEFAULT_VOICE_LANGUAGE
  );
  const [titleLanguage, setTitleLanguage] = React.useState(
    DEFAULT_TITLE_LANGUAGE
  );

  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems={"center"} spacing={1}>
        <LanguageMenu
          onSelectTitleLanguage={setTitleLanguage}
          onSelectVoiceLanguage={setVoiceLanguage}
        />
        <TopBar />
        <SearchAnime titleLanguage={titleLanguage} voiceLanguage={voiceLanguage} />
      </Stack>
      <Grid container justifyContent="center">
        <Button
          href="https://github.com/myomyom/voice-compare"
          size="small"
        >
          🐟
        </Button>
      </Grid>
    </ThemeProvider>
  );
}
