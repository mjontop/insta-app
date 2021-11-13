import React, { useState } from "react";
import { Box, Button, Modal } from "@material-ui/core";
import st from "../../styles/Post.module.css";
import DeleteOutlineRounded from "@material-ui/icons/DeleteOutlineRounded";

import { deletePost } from "./helper";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  height: "200px",
  borderRadius: "1rem",
  padding: "5px 1rem",
  overflowY: "scroll",
};

export default function DeletePopup({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [buttonText, setButtonText] = useState("Delete");
  const [error, setError] = useState({
    hasError: false,
    message: "",
  });
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = async () => {
    const url = window.location.pathname;
    const id = url.split("/")[2];
    setButtonText("Deleting...");
    const data = await deletePost(id);
    if (data.error) {
      setError({
        hasError: true,
        message: "Error in Deleting Post!",
      });
      return;
    }
    setButtonText("Delete");
    router.push("/");
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ outline: "none" }}
      >
        <Box sx={style} className="hideScrollbar">
          <div className={st.deletePopUp}>
            <strong className="fs-3 text-center">Delete Post ?</strong>
            {!error.hasError && (
              <p>Are you sure you want to delete this post?</p>
            )}
            <br />
            {error.hasError && <p className="text-danger">{error.message}</p>}
            <div
              className="d-flex w-100"
              style={{ justifyContent: "space-evenly", alignItems: "center" }}
            >
              <Button
                variant="outlined"
                color="red"
                startIcon={<DeleteOutlineRounded />}
                style={{ color: "red", border: "1px solid red" }}
                onClick={handleDeletePost}
              >
                {buttonText}
              </Button>
              <span onClick={handleClose} className="cursor-ptr">
                Cancel
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
