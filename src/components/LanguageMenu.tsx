import {
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";
import {
  DEFAULT_TITLE_LANGUAGE,
  DEFAULT_VOICE_LANGUAGE,
  TITLE_LANGUAGE,
  VOICE_LANGUAGE,
} from "../utils/scripts";

type LanguageMenuProps = {
  onSelectTitleLanguage: (language: string) => void;
  onSelectVoiceLanguage: (language: string) => void;
};

export default function LanguageMenu({
  onSelectTitleLanguage,
  onSelectVoiceLanguage,
}: LanguageMenuProps) {
  const [voiceLanguage, setVoiceLanguage] = React.useState(
    DEFAULT_VOICE_LANGUAGE,
  );
  const [titleLanguage, setTitleLanguage] = React.useState(
    DEFAULT_TITLE_LANGUAGE,
  );
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeTitleLanguage = (event: SelectChangeEvent) => {
    const ev = event.target.value as string;
    setTitleLanguage(ev);
    onSelectTitleLanguage(ev);
  };
  const handleChangeVoiceLanguage = (event: SelectChangeEvent) => {
    const ev = event.target.value as string;
    setVoiceLanguage(ev);
    onSelectVoiceLanguage(ev);
  };

  return (
    <>
      <IconButton
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          marginTop: 10,
          marginRight: 10,
        }}
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
      >
        <OptionMenu
          label="Title format"
          options={TITLE_LANGUAGE}
          onSelectOption={handleChangeTitleLanguage}
          value={titleLanguage}
        ></OptionMenu>
        <OptionMenu
          label="Voice language"
          options={VOICE_LANGUAGE}
          onSelectOption={handleChangeVoiceLanguage}
          value={voiceLanguage}
        ></OptionMenu>
      </Menu>
    </>
  );
}

type OptionMenuProps = {
  label: string;
  value: string;
  options: string[];
  onSelectOption: (event: SelectChangeEvent) => void;
};

export function OptionMenu({
  label,
  value,
  options,
  onSelectOption,
}: OptionMenuProps) {
  return (
    <MenuItem>
      <Stack>
        <Typography variant="caption" sx={{paddingBottom: "5px"}}>{label}</Typography>
        <Select
          label={label}
          onChange={onSelectOption}
          value={value}
          size="small"
          sx={{ width: "150px" }}
        >
          {options.map((title, i) => {
            return (
              <MenuItem key={i} value={title}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
      </Stack>
    </MenuItem>
  );
}
