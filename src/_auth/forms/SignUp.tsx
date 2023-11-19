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
import { FormButton, IFormValues, Input } from "src/Components/FormComponents";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "src/lib/react-query/react-query";
import { useUserContext } from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarsChooser from "src/Components/ProfileAvatars/AvatarsChooser";
import { useState } from "react";
import { AvatarType } from "src/types";
import { avatars as avatarsArray } from "src/Components/ProfileAvatars/ProfilePictures";

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
    formState: { errors },
    reset,
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const user = await createUserAccount({
      ...data,
      name: `${data.name} ${data.surname}`,
      defaultCharacter: avatar.id,
    });
    if (!user) return toast.warn("SignUp failed. Please repeat it again");

    const session = await signInAccount({
      email: user.email,
      password: user.password,
    });
    if (!session) return toast.warn("SignUp failed. Please repeat it again");

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      reset();
      navigate("/");
    } else return toast.warn("SignUp failed. Please repeat it again");
  };

  if (isPending || isLoading || isSignInLoading) return <>Loading...</>;
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline />

      <Container
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          mt: 6,
          justifyContent: "center",
        }}
        component="main"
      >
        <Grow in={true} {...{ timeout: 1000 }}>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h6">Choose your character</Typography>

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
              <Typography variant="h2">Sign Up</Typography>
              <Box sx={{ ml: "auto" }}>
                <Avatar
                  key={avatar.id}
                  src={avatar.image}
                  alt={avatar.name}
                  sx={{
                    width: 150,
                    height: 150,
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
                label="Name*"
                name="name"
                register={register}
              />
              {errors.name && (
                <Typography color="error" variant="body2">
                  This field is required
                </Typography>
              )}

              <Input
                label="Surname*"
                autoComplete="surname"
                name="surname"
                register={register}
              />
              {errors.surname && (
                <Typography color="error" variant="body2">
                  This field is required
                </Typography>
              )}
              <Input
                label="Email*"
                autoComplete="email"
                name="email"
                register={register}
              />
              {errors.email && (
                <Typography color="error" variant="body2">
                  This field is required
                </Typography>
              )}

              <Input
                type="password"
                autoComplete="current-password"
                label="Password*"
                name="password"
                register={register}
              />
              {errors.password && (
                <Typography color="error" variant="body2">
                  This field is required
                </Typography>
              )}

              <FormButton type="submit">Sign Up</FormButton>
            </Box>
          </Box>
        </Grow>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
