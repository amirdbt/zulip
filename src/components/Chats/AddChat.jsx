import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  TextField,
  useTheme,
  makeStyles,
  LinearProgress,
  Snackbar,
  Slide,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AddCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
  },
  error: {
    color: "rgb(235, 54, 54)",
    marginTop: "-20px",
    marginBottom: "10px",
  },
}));

const AddChannel = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [al, setAl] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Formik
      initialValues={{
        title: "",
        token,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("Creating channel", values);
          setLoading(true);
          axios
            .post(
              `https://banana-crumble-17466.herokuapp.com/channel/new`,
              values,
              { headers: { Authorization: `${token}` } }
            )
            .then((res) => {
              setMessage("Channel created successfully");
              setAl(true);
              setLoading(false);
              resetForm({});
              refetch();
              setTimeout(() => {
                setAl(false);
                setOpen(false);
              }, 2000);
            })
            .catch((err) => {
              setMessage("Channel could not be created, try again");
              setErr(true);
              setAl(true);
              setSeverity("error");
              setLoading(false);
              setTimeout(() => {
                setErr(false);
              }, 700);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Required"),
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
          <div>
            <IconButton
              variant="outlined"
              style={{ marginLeft: "60px", color: "#fff" }}
              onClick={handleClickOpen}
            >
              <AddCircleOutline />
            </IconButton>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              fullWidth
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Add channel"}
              </DialogTitle>
              {al ? (
                <>
                  <Alert severity={severity}>
                    <AlertTitle>{severity}</AlertTitle>
                    {message}
                  </Alert>
                  <Snackbar
                    open={open}
                    // autoHideDuration={3000}
                    TransitionComponent={Slide}
                    onClose={handleClose}
                  >
                    <Alert severity={severity}>{message}</Alert>
                  </Snackbar>
                </>
              ) : (
                <div></div>
              )}
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <div>
                    <TextField
                      name="title"
                      label="Channel Name"
                      variant="outlined"
                      fullWidth
                      type="text"
                      error={err}
                      value={values.title || ""}
                      className={errors.title && touched.title && "error"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: "20px", marginRight: "10px" }}
                    />

                    {errors.title && touched.title && (
                      <div className={classes.error}> {errors.title} </div>
                    )}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    color="primary"
                    autoFocus
                  >
                    Submit
                  </Button>
                  {loading && (
                    <LinearProgress
                      variant="query"
                      style={{ marginTop: "10px" }}
                    />
                  )}
                </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddChannel;
