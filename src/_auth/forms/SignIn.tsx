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
import { NavLink } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { FormButton } from "src/Components/ui/FormButton";
import { toast } from "react-toastify";
import layingImage from "/LayingDoodleYYY.png";
import Spinner from "src/Components/Spinner";
import { useEffect } from "react";
import { IFormNames } from "src/types";
import { Input } from "src/Components/ui/Input";
import { useSignInAccount } from "src/lib/react-query";

interface ISignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,

    formState: { errors },
  } = useForm<IFormNames>();
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<ISignInForm> = async (value) => {
    try {
      await signInAccount(value);
      reset();
    } catch (error) {
      toast.warn(t("error_signin_failed"));
      console.error(error);
    }
  };
  if (isPending) return <Spinner />;
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "stretched",
          p: { xs: 3 },
          mt: { sx: 0, md: 10 },
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
        component="main"
      >
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "flex", md: "none" },
            }}
          >
            <CardMedia
              sx={{ m: "0 auto", maxWidth: "400px" }}
              component="img"
              image={layingImage}
            />
          </Box>
        </Slide>
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
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
              p: 2,
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
              {t("sign_in")}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Input
                type="email"
                label={t("email")}
                autoComplete="email"
                name="email"
                register={register}
              />

              <Typography variant="body2" color="error">
                {errors.email ? "This field is required" : " "}
              </Typography>

              <Input
                label={t("password")}
                type="password"
                autoComplete="current-password"
                name="password"
                register={register}
              />
              {errors.password && <p>{t("field_required_password")} </p>}

              <FormButton type="submit">{t("sign_in_btn")}</FormButton>
              <Grid container>
                <Grid item>
                  <NavLink to="/sign-up">{t("do_not_have_account")}</NavLink>
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
