import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Link from "next/link";
import DeletePopup from "../DeletePopup";

export default function EditPopover({ image, captions, postId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="cursor-ptr">
      <MoreHorizIcon
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="d-flex cursor-ptr flex-column">
          <Link
            href={{
              pathname: "/posts/edit/",
              query: { image, captions, postId },
            }}
          >
            <span className="px-3 p-1 hoverEffect">Edit Post</span>
          </Link>
          <DeletePopup>
            <div className="px-3 p-1 d-flex justify-content-between mt-1 hoverEffect">
              <DeleteOutlineRoundedIcon />
              <div className="mx-3">Delete Post</div>
            </div>
          </DeletePopup>
        </div>
      </Popover>
    </div>
  );
}
