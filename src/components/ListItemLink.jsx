/* eslint-disable react/prop-types */
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function ListItemLink({ primary, src, onClick, selectedIndex }) {
  return (
    <ListItemButton onClick={onClick} selected={selectedIndex}>
      <ListItemAvatar>
        <Avatar
          src={src}
          variant="square"
          sx={{
            width: { xs: 25, sm: 50, md: 75, lg: 100, xl: 120 },
            height: "auto",
            // height: { xs: 25, sm: 50, md: 75, lg: 100 },
            marginRight: { xs: 0, sm: 2 },
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={primary}
        onClick={onClick}
        primaryTypographyProps={{
          fontSize: { xs: 10, sm: 15, xl: 18 },
        }}
      />
    </ListItemButton>
  );
}
