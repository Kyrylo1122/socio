import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useUserContext } from "src/hooks/useUserContext";
import AvatarImage from "../ProfileAvatars/AvatarImage";
import { useTranslation } from "react-i18next";
import { Button, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useDialogContext from "src/hooks/useDialogContext";
import useSelectUserChat from "src/hooks/useSelectUserChat";
import { IUser } from "src/types";

export default function FriendSearch() {
  const { friends } = useUserContext();
  const [value, setValue] = useState("");
  const { open, isOpen, close } = useDialogContext();
  const { t } = useTranslation();
  const { handleSelect } = useSelectUserChat();

  const onBlur = () => {
    setValue("");
  };

  const handleOpenChat = async (user: IUser) => {
    try {
      await handleSelect(user);

      if (isOpen) return;
      open();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
      options={friends ? friends : []}
      getOptionLabel={(option) => option.name}
      autoHighlight
      onBlur={onBlur}
      selectOnFocus
      inputValue={value}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& > img": { mr: 2, flexShrink: 0 },
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
          {...props}
        >
          <NavLink to={option.uid} onClick={() => close()}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AvatarImage
                name={option.name}
                photoUrl={option.photoUrl}
                defaultCharacter={option.defaultCharacter}
                sx={{
                  width: 50,
                  height: 50,
                }}
              />
              {option.name}
            </Box>
          </NavLink>
          <Button
            sx={{
              ml: "auto",
              color: "primary.accent",
              "&:hover,&:focus": { transform: "scale(1.1)" },
            }}
            variant="text"
            onClick={() => handleOpenChat(option)}
          >
            <EmailIcon color="inherit" />
          </Button>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            width: "100%",
            flex: 1,
            "& .MuiAutocomplete-endAdornment": { display: "none" },
            "& .MuiFormLabel-root.Mui-focused": {
              opacity: 0,
            },
          }}
          placeholder={t("search")}
          label={<SearchIcon />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
