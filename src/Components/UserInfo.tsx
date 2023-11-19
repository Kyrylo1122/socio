import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IUserInfo } from "src/types";
import Modal from "src/Components/Modal";
import { useForm } from "react-hook-form";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FormBackground from "/MeditatingDoodle.png";
import { updateUserInfo } from "src/lib/api";

const Btn = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create("transform"),
  color: theme.palette.mode === "dark" ? "white" : "black",
  "&:hover,&:focus": {
    transform: "scale(1.05)",
  },
}));
// const userInfoContent = [
//   { key: "city", value: "Kharkiv" },
//   { key: "country", value: "Ukraine" },
//   { key: "status", value: "Have girlfriend" },
// ];

interface IValue {
  city?: string;
  country?: string;
  status?: string;
}
const UserInfoForm = () => {
  const { t } = useTranslation();

  const [isOpenCity, setIsOpenCity] = useState(false);
  const [relationsStatus, setRelationsStatus] = useState(false);

  const toggleCity = () => setIsOpenCity((state) => !state);
  const toggleRelationsStatus = () => setRelationsStatus((status) => !status);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values: IValue) => {
    const arrayFromValues = Object.entries(values).map((item) => ({
      key: item[0],
      value: item[1],
    }));
    const data = { userInfo: arrayFromValues };
    try {
      await updateUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  };
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
          p: 6,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ width: "50%" }}>
          <TextField
            variant="standard"
            fullWidth
            sx={{
              outline: "none",
              "& .MuiFormLabel-root.Mui-focused": {
                color: "text.accent",
              },
            }}
            label="Country"
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
                sx={{
                  outline: "none",
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "text.accent",
                  },
                }}
                label="City"
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
                sx={{
                  outline: "none",
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "text.accent",
                  },
                }}
                label="Relations status"
                placeholder="Looking for a love..."
                {...register("status")}
              />
            </Box>
          </Collapse>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            background: "transparent",
          }}
        >
          <Btn variant="text" onClick={toggleCity}>
            <Box component="label" sx={{ mr: 1 }}>
              <LocationCityIcon color="secondary" />
            </Box>
            {t(isOpenCity ? "remove_city" : "add_city")}
          </Btn>

          <Btn type="button" variant="text" onClick={toggleRelationsStatus}>
            <Box component="label" sx={{ mr: 1 }}>
              <Diversity1Icon color="secondary" />{" "}
            </Box>
            {t(relationsStatus ? "remove_status" : "add_status")}
          </Btn>

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
            Share here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const UserInfo = ({ userInfo }: { userInfo: IUserInfo[] }) => {
  const { t } = useTranslation();

  const [infoModal, setInfoModal] = useState(false);
  const closeModal = () => setInfoModal(false);
  const openModal = () => setInfoModal(true);

  return (
    <Box>
      <Typography variant="h4">{t("user_info")}</Typography>
      <Divider />
      <List>
        {userInfo.length ? (
          userInfo.map(({ key, value }) => (
            <ListItem key={key} sx={{ pt: 0, pb: 0 }}>
              {t(key)} : {value}
            </ListItem>
          ))
        ) : (
          <Typography onClick={openModal}>Add some info</Typography>
        )}
        <Modal open={infoModal} close={closeModal}>
          <UserInfoForm />
        </Modal>
      </List>
    </Box>
  );
};

export default UserInfo;
