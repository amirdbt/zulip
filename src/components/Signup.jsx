import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  LinearProgress,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  Card,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import * as Yup from "yup";

import { useMutation } from "react-query";
import { SignUp } from "./Query/Queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "rgb(235, 54, 54)",
  },
}));

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let history = useHistory();
  const classes = useStyles();

  const [mutate, info] = useMutation(SignUp);
  console.log(info);
  {
    info.isSuccess && history.push("/home");
  }
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        password: "",
        email: "",
      }}
      onSubmit={async (values) => {
        await mutate(values);
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string().required("Required").email(),
        password: Yup.string()
          .required("No password provided")
          .min(8)
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters,one lowercase, one uppercase, one number and one special case character"
          ),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <>
            <div style={{ marginBottom: "20px" }}></div>
            <Container component={Card} maxWidth="sm">
              <CssBaseline />
              {info.isError ? (
                <Alert severity="error" onClose={() => info.reset()}>
                  {" "}
                  {info.error.response.data}
                </Alert>
              ) : (
                <div></div>
              )}
              <div className={classes.paper}>
                <div className={classes.display}>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontSize: 35, fontWeight: 500 }}
                  >
                    Welcome
                  </Typography>
                  <Typography
                    component="h4"
                    variant="subtitle1"
                    style={{
                      fontSize: 20,
                      fontWeight: 300,
                      textAlign: "center",
                    }}
                  ></Typography>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="firstname"
                        label="First Name*"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={info.isError}
                        value={values.firstname}
                        className={
                          errors.firstname && touched.firstname && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstname && touched.firstname && (
                        <div className={classes.error}>
                          {" "}
                          {errors.firstname}{" "}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="lastname"
                        label="Last Name*"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={info.isError}
                        value={values.lastname}
                        className={
                          errors.lastname && touched.lastname && "error"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastname && touched.lastname && (
                        <div className={classes.error}> {errors.lastname} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email*"
                        fullWidth
                        variant="outlined"
                        type="text"
                        error={info.isError}
                        value={values.email}
                        className={errors.email && touched.email && "error"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <div className={classes.error}> {errors.email} </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password *"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        error={info.isError}
                        className={
                          errors.password && touched.password && "error"
                        }
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && touched.password && (
                        <div className={classes.error}> {errors.password} </div>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={info.isLoading}
                    className={classes.submit}
                    onClick={handleSubmit}
                    style={{ padding: 15, backgroundColor: "#38006b" }}
                  >
                    Sign up
                  </Button>
                  {info.isLoading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                  <Divider />
                  <div style={{ marginBottom: "20px" }}></div>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="/login"
                        variant="body2"
                        style={{ fontSize: 18, color: "#9e9e9e" }}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                  <div style={{ marginBottom: "20px" }}></div>
                </form>
              </div>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};
export default Signup;
