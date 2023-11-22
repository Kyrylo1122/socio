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
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "src/lib/react-query/react-query";
import { useUserContext } from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarsChooser from "src/Components/ProfileAvatars/AvatarsChooser";
import { useEffect, useState } from "react";
import { AvatarType, IFormNames } from "src/types";
import { avatars as avatarsArray } from "src/Components/ProfileAvatars/ProfilePictures";
import { useTranslation } from "react-i18next";
import Spinner from "src/Components/Spinner";
import { Input } from "src/Components/ui/Input";

const SignUp = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<AvatarType>(avatarsArray[0]);

  const { mutateAsync: createUserAccount, isPending } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSignInLoading } =
    useSignInAccountMutation();

  const { checkAuthUser, isLoading } = useUserContext();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<IFormNames>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<IFormNames> = async (data) => {
    const user = await createUserAccount({
      ...data,
      name: `${data.name} ${data.surname}`,
      defaultCharacter: avatar.id,
    });
    if (!user) return toast.warn(t("error_signup_failed"));

    const session = await signInAccount({
      email: user.email,
      password: user.password,
    });
    if (!session) return toast.warn(t("error_signup_failed"));

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      reset();
      navigate("/");
    } else return toast.warn(t("error_signup_failed"));
  };
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  if (isPending || isLoading || isSignInLoading) return <Spinner />;
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline />
      <Box sx={{ m: "0 auto" }}>
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
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
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
                />
                {errors.password && (
                  <Typography color="error" variant="body2">
                    {t("field_required")}
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
