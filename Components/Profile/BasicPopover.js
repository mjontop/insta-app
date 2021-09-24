import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded";

export default function BasicPopover({ onClick }) {
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
        <div className="px-3 p-1 d-flex cursor-ptr" onClick={onClick}>
          <ExitToAppRounded />
          <div>Log out</div>
        </div>
      </Popover>
    </div>
  );
}
