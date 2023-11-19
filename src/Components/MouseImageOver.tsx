import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useTranslation } from "react-i18next";

interface IMouseImageOver {
  onEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function MouseImageOver({
  onEdit,
  onDelete,
  children,
}: IMouseImageOver) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onEditClick = () => {
    onEdit();
    handlePopoverClose();
  };

  return (
    <Box
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      {children}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handlePopoverClose}
          MenuListProps={{ onMouseLeave: handlePopoverClose }}
        >
          <MenuItem
            onClick={onEditClick}
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            {t("update_image")}
            <EditIcon />
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            onClick={onDelete}
          >
            {t("delete_image")}
            <DeleteIcon />
          </MenuItem>
        </Menu>
      </Popover>
    </Box>
  );
}
