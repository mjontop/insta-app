import { Box, Modal } from "@material-ui/core";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  height: "40vh",
  borderRadius: "1rem",
  padding: "5px 1rem",
};

const DisplayList = ({ name }) => (
  <div className="d-flex my-2 justify-content-between align-items-center">
    <div>{name}</div>
    <button className="btn">follow</button>
  </div>
);

export default function ConnetionsList({ name, children, list }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <p className="text-center">
            <strong className="fs-3 text-purple">{name}</strong>
          </p>
          <hr />
          <div className="mt-1">
            {list.map((l) => (
              <DisplayList name={l} />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
