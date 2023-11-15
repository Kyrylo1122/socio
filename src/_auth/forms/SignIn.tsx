import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Grid,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import useThemeContext from "src/hooks/useThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { FormButton, IFormValues, Input } from "src/Components/FormComponents";
import { signInAccount } from "src/lib/api";
import { useUserContext } from "src/context/AuthContext";
import { toast } from "react-toastify";

interface ISignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { t } = useTranslation();

  const { mode } = useThemeContext();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<ISignInForm> = async (value) => {
    const session = await signInAccount(value);
    if (!session)
      return toast.warn(
        "Oops...Something went wrong. Please repeat sign up again"
      );

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      reset();
      navigate("/");
    } else return toast.warn("SignUp failed. Please repeat it again");
  };
  if (isLoading) return <>Loading...</>;
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "stretched",
          mt: 10,
          justifyContent: "center",
        }}
        component="main"
      >
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              image={mode === "light" ? "/pink-doodler.png" : "/FloatD.png"}
            />
          </Box>
        </Slide>
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...{ timeout: 1000 }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.accent" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Input
                label="Email"
                autoComplete="email"
                name="email"
                register={register}
              />

              <Typography variant="body2" color="error">
                {errors.email ? "This field is required" : " "}
              </Typography>

              <Input
                label="Password*"
                type="password"
                autoComplete="current-password"
                name="password"
                register={register}
              />
              {errors.password && <p>This field is required</p>}

              <FormButton type="submit">Sign In</FormButton>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/">Forgot password?</NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/sign-up">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grow>
      </Container>
    </>
  );
};
export default SignIn;
