import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded";
import Link from "next/link";

export default function BasicPopover({ onClick, username }) {
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
    <div>
      <SettingsOutlinedIcon
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
          <Link href={`/${username}/editProfile/`}>
            <span className="px-3 p-1 hoverEffect">Edit Profile</span>
          </Link>
          <div className="px-3 p-1 d-flex justify-content-between mt-1 hoverEffect">
            <ExitToAppRounded />
            <div className="mx-3" onClick={onClick}>
              Log out
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
