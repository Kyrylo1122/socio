import { useEffect, useState } from "react";

import {
  Avatar,
  Container,
  CssBaseline,
  Grow,
  Box,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { THEME_ID } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import useThemeContext from "src/hooks/useThemeContext";
import { FormButton } from "src/Components/ui/FormButton";
import { useCreateUserAccount } from "src/lib/react-query";
import { toast } from "react-toastify";
import AvatarsChooser from "src/Components/ProfileAvatars/AvatarsChooser";
import { AvatarType, IFormNames } from "src/types";
import { avatars as avatarsArray } from "src/Components/ProfileAvatars/ProfilePictures";
import { useTranslation } from "react-i18next";
import Spinner from "src/Components/Spinner";
import { Input } from "src/Components/ui/Input";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const { theme } = useThemeContext();
  const [avatar, setAvatar] = useState<AvatarType>(avatarsArray[0]);

  const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<IFormNames>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IFormNames> = async ({
    name,
    surname,
    password,
    email,
  }) => {
    try {
      await createUserAccount({
        name: `${name} ${surname}`,
        password,
        email,
        defaultCharacter: avatar.id,
      });
      reset();
    } catch (error) {
      toast.warn(t("error_signup_failed"));
      console.error(error);
    }
  };
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  if (isPending) return <Spinner />;
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline />
      <Box sx={{ ml: 2 }} component={NavLink} to="/sign-in">
        {t("back_to_sign_in")}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ m: "0 auto" }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "baseline",
            mt: 6,
            justifyContent: "center",
          }}
          component="main"
        >
          <Grow in={true} {...{ timeout: 1000 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography variant={"h2"}>
                {t("choose_your_character")}
              </Typography>

              <AvatarsChooser setAvatar={setAvatar} />
            </Box>
          </Grow>
          <Grow in={true}>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Typography variant="h2">{t("sign_up")}</Typography>
                <Box sx={{ ml: "auto" }}>
                  <Avatar
                    key={avatar.id}
                    src={avatar.image}
                    alt={avatar.name}
                    sx={{
                      width: { xs: 100, sm: 150 },
                      height: { xs: 100, sm: 150 },
                      border: "1px solid black",
                      backgroundColor: "primary.accent",
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                <Input
                  autoComplete="name"
                  label={t("name")}
                  name="name"
                  register={register}
                />
                {errors.name && (
                  <Typography color="error" variant="body2">
                    {t("field_required")}
                  </Typography>
                )}

                <Input
                  label={t("surname")}
                  autoComplete="surname"
                  name="surname"
                  register={register}
                />
                {errors.surname && (
                  <Typography color="error" variant="body2">
                    {t("field_required")}
                  </Typography>
                )}
                <Input
                  label={t("email")}
                  autoComplete="email"
                  name="email"
                  register={register}
                />
                {errors.email && (
                  <Typography color="error" variant="body2">
                    {t("field_required")}
                  </Typography>
                )}

                <Input
                  label={t("password")}
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  register={register}
                  isPassword
                />
                {errors.password && (
                  <Typography color="error" variant="body2">
                    {t("field_required_password")}
                  </Typography>
                )}

                <FormButton
                  sx={{ display: { xs: "none", lg: "flex" }, p: 3 }}
                  type="submit"
                >
                  {t("sign_up_btn")}
                </FormButton>
              </Box>
            </Box>
          </Grow>
        </Container>
        <FormButton sx={{ display: { lg: "none" }, p: 3 }} type="submit">
          {t("sign_up_btn")}
        </FormButton>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
