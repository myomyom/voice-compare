import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import type { VARoles, Staff, Character } from "../utils/types";

interface CharacterResultProps {
  comparisonResult: Map<number, VARoles> | null;
  titleLanguage: string;
}

const chevronButtonSx = {
  position: "absolute",
  top: { xs: "45%", sm: "60%" },
  p: { xs: 0.25, sm: 0.5 },
  color: "common.black",
  bgcolor: "#ffffffe6",
  "&:hover": { bgcolor: "common.white" },
  "&.Mui-disabled": { bgcolor: "#ffffff73" },
  "& svg": { fontSize: { xs: 16, sm: 24 } },
} as const;

export default function CharacterResult({
  comparisonResult,
  titleLanguage,
}: CharacterResultProps) {
  const [activeSteps, setActiveSteps] = React.useState<Map<string, number>>(
    new Map(),
  );

  if (!comparisonResult) return null;

  const handleNext = (rowKey: string, maxSteps: number) => {
    setActiveSteps((prev) => {
      const newSteps = new Map(prev);
      const currentStep = newSteps.get(rowKey) || 0;
      if (currentStep < maxSteps - 1) {
        newSteps.set(rowKey, currentStep + 1);
      }
      return newSteps;
    });
  };

  const handleBack = (rowKey: string) => {
    setActiveSteps((prev) => {
      const newSteps = new Map(prev);
      const currentStep = newSteps.get(rowKey) || 0;
      if (currentStep > 0) {
        newSteps.set(rowKey, currentStep - 1);
      }
      return newSteps;
    });
  };

  const staffNameFormat = (staff: Staff) => {
    if (titleLanguage === "Native") return staff.name.native;
    else return staff.name.full;
  };

  const fillCard = (staff: Staff | Character, prefix: string) => {
    return (
      <Card
        key={`${prefix}-${staff.id}`}
        variant="outlined"
        sx={{
          width: { xs: 75, sm: 150 },
          height: { xs: 175, sm: 275 },
        }}
      >
        <CardMedia
          sx={{ height: { xs: 100, sm: 200 } }}
          image={staff.image.large}
          component="img"
        />
        <CardContent>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "smaller"
            }}
          >
            {staffNameFormat(staff)}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const fillCardArray = (
    chara: Character[],
    prefix: string,
    rowKey: string,
  ) => {
    if (chara.length === 1) {
      return fillCard(chara[0], prefix);
    }

    const activeStep = activeSteps.get(rowKey) || 0;
    const maxSteps = chara.length;

    return (
      <Box
        sx={{
          position: "relative",
          width: { xs: 75, sm: 150 },
        }}
      >
        {fillCard(chara[activeStep], `${prefix}-${activeStep}`)}
        <IconButton
          size="small"
          onClick={() => handleBack(rowKey)}
          disabled={activeStep === 0}
          sx={{ ...chevronButtonSx, left: 3 }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleNext(rowKey, maxSteps)}
          disabled={activeStep === maxSteps - 1}
          sx={{ ...chevronButtonSx, right: 1 }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  };

  const rows = [];
  for (const [key, value] of comparisonResult) {
    const rowKey = `row-${key}`;
    rows.push(
      <Grid
        key={key}
        container
        direction="row"
        spacing={{ xs: 1, md: 2, lg: 4, xl: 8 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        {fillCardArray(value.characters1, `${key}-char1`, `${rowKey}-char1`)}
        {fillCard(value.staff, `${key}-staff`)}
        {fillCardArray(value.characters2, `${key}-char2`, `${rowKey}-char2`)}
      </Grid>,
    );
  }

  return <>{rows}</>;
}
