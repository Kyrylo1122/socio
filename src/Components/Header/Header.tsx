import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";

import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import FriendSearch from "../ui/FriendsSearch";
import { MaterialUISwitch, Search } from "../ui/StyledComponents";
import AvatarImage from "../AvatarImage";
import { useUserContext } from "src/hooks/useUserContext";
import LanguageSelect from "../LanguageSelect";
import useThemeContext from "src/hooks/useThemeContext";
import { Navigation } from "..";
import { useSignOutAccount } from "src/lib/react-query";
import useLocaleStorageData from "src/hooks/useLocaleStorageData";
import { SxProps } from "@mui/material";

export default function Header() {
  const { user } = useUserContext();
  const { mode, toggleColorMode } = useThemeContext();
  const navigate = useNavigate();
  const { mutateAsync: signOut } = useSignOutAccount();
  const { setCurrentUser: setUserLocalStorage } = useLocaleStorageData();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const navigateToHome = () => {
    handleMenuClose();

    navigate("/");
  };
  const handleLogOut = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setUserLocalStorage(null);

    await signOut();
    navigate(0);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      sx={{ width: "100%" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        sx={{ display: { xs: "flex", sm: "none" } }}
        onClick={handleMobileMenuClose}
      >
        <LanguageSelect />
        <MaterialUISwitch
          onChange={() => toggleColorMode()}
          checked={mode === "dark"}
        />
      </MenuItem>
      <MenuItem onClick={navigateToHome}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );
  const HeaderAvatar = ({ sx }: { sx?: SxProps }) => (
    <AvatarImage
      name={user.name}
      photoUrl={user.photoUrl}
      defaultCharacter={user.defaultCharacter}
      sx={{
        ...sx,
        width: { xs: "50px" },
        height: { xs: "50px" },

        transform: user.photoUrl ? "" : "scalex(-1)",
      }}
    />
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <LanguageSelect />
        <MaterialUISwitch
          onChange={() => toggleColorMode()}
          checked={mode === "dark"}
        />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 0.5, sm: 1 },
        }}
      >
        <Toolbar
          sx={{
            p: 0,

            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box>
            {" "}
            <NavLink to={"/"}>
              <Logo />
            </NavLink>
          </Box>

          <Search>
            <FriendSearch />
          </Search>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                m: "0 auto",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <LanguageSelect />
              <MaterialUISwitch
                onChange={() => toggleColorMode()}
                checked={mode === "dark"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                m: { sx: "0 auto", sm: 0 },
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  display: { xs: "none", sm: "flex", md: "none" },
                  p: { xs: 0, sm: 1 },
                }}
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              <Box
                component={NavLink}
                sx={{
                  display: { xs: "none", lg: "flex" },
                  borderRadius: "50%",
                  color: "inherit",
                  p: 1,
                  "&:hover,&:focus": {
                    bgcolor: "primary.accent",
                    color: "primary.white",
                  },
                }}
                to="chats"
              >
                <Badge color="secondary">
                  <MailIcon />
                </Badge>
              </Box>
              <IconButton
                sx={{ ml: { xs: 0, sm: 1 }, p: 0 }}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <HeaderAvatar />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Navigation isHeader />
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
