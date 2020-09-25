import React from "react";
import { IconButton, CircularProgress } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { delMessage } from "../Query/Queries";
import { useMutation } from "react-query";

const DelMessage = ({ message_id, refetch }) => {
  const [mutate, info] = useMutation(delMessage);
  const delMess = async () => {
    await mutate({
      id: message_id,
    });
    refetch();
  };
  return (
    <div>
      {info.isLoading ? (
        <CircularProgress style={{ color: "#6a1b9a", width: "35px" }} />
      ) : (
        <IconButton onClick={delMess}>
          <DeleteOutline />
        </IconButton>
      )}
    </div>
  );
};

export default DelMessage;
