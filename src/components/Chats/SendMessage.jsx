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
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { decodedToken } from "../Query/Queries";

const useStyle = makeStyles((theme) => ({
  sendInput: {
    position: "fixed",
    width: "78%",
    top: "87%",
    zIndex: 2,
  },
}));

const SendMessage = ({ channel_id, refetch }) => {
  const [message, setMessage] = useState("");

  const [chosenEmoji, setChosenEmoji] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { _id } = decodedToken();
  const token = localStorage.getItem("token");
  const EmojiOn = () => {
    setShowEmoji(!showEmoji);
  };

  const classes = useStyle();

  const onEmojiClick = (event) => {
    setChosenEmoji(event.native);
    setMessage(message + chosenEmoji);
  };
  return (
    <Formik
      initialValues={{
        token,
        msg: "",
        user: _id,
        channel_id,
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
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.sendInput}
              >
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
                  startAdornment={
                    <InputAdornment position="start">
                      <span>
                        {showEmoji ? (
                          <span style={styles.emojiPicker}>
                            {" "}
                            <Picker onSelect={onEmojiClick} title="MyZulip" />
                          </span>
                        ) : (
                          <div></div>
                        )}
                        <p style={{ cursor: "pointer" }} onClick={EmojiOn}>
                          {String.fromCodePoint(0x1f60a)}
                        </p>
                      </span>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {isLoading ? (
                        <CircularProgress
                          style={{ color: "#6a1b9a", width: "35px" }}
                        />
                      ) : (
                        <IconButton
                          style={{ color: "#6a1b9a" }}
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

export default SendMessage;
const styles = {
  getEmojiButton: {
    // cssFloat: "left",
    border: "solid",
    margin: 0,
    cursor: "pointer",
    bottom: 10,
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px",
  },
};
