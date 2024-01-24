import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import useThemeContext from "src/hooks/useThemeContext";
import LanguageSelect from "./LanguageSelect";

import Logo from "./Logo";
import { useUserContext } from "src/hooks/useUserContext";
import AvatarImage from "./AvatarImage";
import { useNavigate } from "react-router-dom";
import { useSignOutAccount } from "src/lib/react-query";
import useLocaleStorageData from "src/hooks/useLocaleStorageData";
import FriendSearch from "./ui/FriendsSearch";
import SearchIcon from "@mui/icons-material/Search";
import { MaterialUISwitch, Search } from "./ui/StyledComponents";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signOut } = useSignOutAccount();
  const { mode, toggleColorMode } = useThemeContext();
  const { setCurrentUser: setUserLocalStorage } = useLocaleStorageData();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setUserLocalStorage(null);

    await signOut();
    navigate(0);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const HeaderAvatar = () => (
    <AvatarImage
      name={user.name}
      photoUrl={user.photoUrl}
      defaultCharacter={user.defaultCharacter}
      sx={{
        transform: user.photoUrl ? "" : "scalex(-1)",
      }}
    />
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
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
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={40} color="success">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={18} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const MobileHeader = () => (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        justifyContent: "space-between",
        width: "100%",
        position: "fixed",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "primary.dark",
        zIndex: 5,
        p: 1,
      }}
    >
      <Logo />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SearchIcon sx={{ width: "32px", height: "32px" }} />
        <LanguageSelect />
        <MaterialUISwitch
          onChange={() => toggleColorMode()}
          checked={mode === "dark"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
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
  );
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "none", sm: "block" },
          p: 1,
          backgroundColor: "background.paper",
          backgroundImage: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Logo />

          <Search>
            <FriendSearch />
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={onSearch}
            /> */}
          </Search>

          <Box sx={{ display: "flex" }}>
            {" "}
            <MaterialUISwitch
              sx={{ m: 2 }}
              onChange={() => toggleColorMode()}
              checked={mode === "dark"}
            />
            <Box sx={{ marginRight: 1 }}>
              <LanguageSelect />
            </Box>
          </Box>
          <>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={40} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton
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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </>
        </Toolbar>
      </AppBar>
      <MobileHeader />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
