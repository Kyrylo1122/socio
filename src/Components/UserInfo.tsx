import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "src/Components/Modal";
import { useForm } from "react-hook-form";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FormBackground from "/MeditatingDoodle.png";
import { useUpdateUserInfo } from "src/lib/react-query";
import { useUserContext } from "src/hooks/useUserContext";
import { StyledButton } from "./ui/StyledComponents";

const inputStyle = {
  outline: "none",
  "& .MuiFormLabel-root.Mui-focused": {
    color: "text.accent",
  },
};
interface IUserInfo {
  name?: string;
  id: string;
  city?: string;
  country?: string;
  status?: string | null;
}
type UserInfoFormType = IUserInfo & { close: () => void };

const UserInfoForm = ({
  id,
  close,
  city,
  country,
  status,
}: UserInfoFormType) => {
  const { t } = useTranslation();

  const [isOpenCity, setIsOpenCity] = useState(Boolean(city));
  const [relationsStatus, setRelationsStatus] = useState(Boolean(status));

  const toggleCity = () => setIsOpenCity((state) => !state);
  const toggleRelationsStatus = () => setRelationsStatus((status) => !status);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      city,
      country,
      status,
    },
  });
  const { mutateAsync: updateUserInfo, isPending } = useUpdateUserInfo();

  const onSubmit = async (data: Partial<IUserInfo>) => {
    try {
      await updateUserInfo({ uid: id, data });
      close();
    } catch (error) {
      console.error(error);
    }
  };
  if (isPending) return <>Loading...</>;
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '" "',
          width: "30%",
          height: "60%",
          display: "block",
          position: "absolute",
          right: 0,
          top: 0,
          opacity: 0.2,
          objectFit: "cover",
          backgroundImage: `url(${FormBackground})`,
          backgroundSize: "cover",
        },
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "transparent",
          gap: 3,
          p: { xs: 1, sm: 1, md: 2 },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ width: "50%" }}>
          <TextField
            variant="standard"
            fullWidth
            sx={inputStyle}
            label={t("country")}
            placeholder="Ukraine..., Spain..."
            {...register("country")}
          />
          <Collapse in={isOpenCity}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <TextField
                variant="standard"
                fullWidth
                sx={inputStyle}
                label={t("city")}
                placeholder="Kyiv..., Barcelona..."
                {...register("city")}
              />
            </Box>
          </Collapse>
          <Collapse in={relationsStatus}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <TextField
                variant="standard"
                fullWidth
                sx={inputStyle}
                label={t("status")}
                placeholder="Looking for a love..."
                {...register("status")}
              />
            </Box>
          </Collapse>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <StyledButton variant="text" onClick={toggleCity}>
            <LocationCityIcon color="secondary" sx={{ mr: 1 }} />
            {t(isOpenCity ? "remove_city" : "add_city")}
          </StyledButton>

          <StyledButton variant="text" onClick={toggleRelationsStatus}>
            <Diversity1Icon color="secondary" sx={{ mr: 1 }} />{" "}
            {t(relationsStatus ? "remove_status" : "add_status")}
          </StyledButton>

          <Button
            type="submit"
            variant="text"
            sx={{
              pr: 2,
              pl: 2,
              color: "text.white",

              background: "Background",
              "&:hover,&:focus": {
                backgroundColor: "primary.accent",
              },
            }}
          >
            {t("share")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const UserInfo = ({ id, city, country, status, name }: IUserInfo) => {
  const { t } = useTranslation();
  const { user: currentUser } = useUserContext();
  const isCurrentUser = currentUser.uid === id;

  const [infoModal, setInfoModal] = useState(false);
  const closeModal = () => setInfoModal(false);
  const openModal = () => setInfoModal(true);
  return (
    <Box>
      <Typography variant="h4">
        {t(isCurrentUser ? "my_info" : "user_info", { name })}
      </Typography>
      <Divider />
      <List>
        <ListItem sx={{ pt: 0, pb: 0 }}>
          {t("city")} : {city}
        </ListItem>
        <ListItem sx={{ pt: 0, pb: 0 }}>
          {t("country")} : {country}
        </ListItem>
        <ListItem sx={{ pt: 0, pb: 0 }}>
          {t("status")} : {status}
        </ListItem>

        {isCurrentUser ? (
          <Button variant="contained" onClick={openModal}>
            {t("add_info")}
          </Button>
        ) : null}

        <Modal open={infoModal} close={closeModal}>
          <UserInfoForm
            id={id}
            close={closeModal}
            city={city}
            country={country}
            status={status}
          />
        </Modal>
      </List>
    </Box>
  );
};

export default UserInfo;
