import React, { useState } from "react";
import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Send } from "@material-ui/icons";

import jwt_decode from "jwt-decode";

const useStyle = makeStyles((theme) => ({
  sendInput: {
    position: "fixed",
    // width: "30%",
    top: "87%",
    marginRight: 10,
    zIndex: 2,
  },
}));

const SendConversation = ({ channel_id, refetch }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { _id } = jwt_decode(token);

  const classes = useStyle();

  return (
    <Formik
      initialValues={{
        token,
        msg: "",
        user: _id,
        channel_id,
        conversation_id: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log("sending message", values);
          setIsLoading(true);
          axios
            .post(
              `https://banana-crumble-17466.herokuapp.com/message/new`,
              values
            )
            .then((res) => {
              console.log(res);
              resetForm({});
              refetch();
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
          setSubmitting(false);
        }, 200);
      }}
      validationSchema={Yup.object().shape({
        msg: Yup.string().required(),
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
            <form onSubmit={handleSubmit}>
              <FormControl variant="outlined" className={classes.sendInput}>
                <OutlinedInput
                  id="msg"
                  name="msg"
                  placeholder="Message"
                  error={error}
                  type="text"
                  value={values.msg}
                  onChange={handleChange}
                  className={errors.msg && touched.msg}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      {isLoading ? (
                        <CircularProgress
                          style={{ color: "#242526", width: "35px" }}
                        />
                      ) : (
                        <IconButton
                          style={{ color: "#242526" }}
                          aria-label="send messages"
                          type="submit"
                        >
                          <Send />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default SendConversation;
