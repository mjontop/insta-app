import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@material-ui/core";
import Link from "next/link";
import getFollowers, {
  getFollowings,
  toggleFollowers,
} from "./helper/ConnctionsListhelper";
import parseJwt from "../../utils/validateJWT";

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
  height: "400px",
  borderRadius: "1rem",
  padding: "5px 1rem",
  overflowY: "scroll",
};
const DisplayList = ({
  name,
  currentUser,
  followersList,
  handleToggleFollow,
  isLoading,
}) => {
  const follows = followersList.includes(name);
  return (
    <div className="d-flex my-2 justify-content-between align-items-center">
      <Link href={`/${name}`}>
        <div
          className="cursor-ptr"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src="https://i.stack.imgur.com/l60Hf.png"
            width="25"
            className="circle"
          />
          <b className="mx-1">{name}</b>
        </div>
      </Link>
      <div>
        {currentUser !== name && (
          <>
            {!follows ? (
              <button className="btn" onClick={() => handleToggleFollow(name)}>
                follow
                {isLoading && (
                  <div
                    className="spinner-border text-white spinner-border-sm mx-2"
                    role="status"
                  ></div>
                )}
              </button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handleToggleFollow(name)}
              >
                Following
                {isLoading && (
                  <div
                    className="spinner-border text-purple spinner-border-sm mx-2"
                    role="status"
                  ></div>
                )}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function ConnetionsList({
  name,
  children,
  email,
  followersList,
  showFollowers = true,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (followingUpdated) {
      const event = new Event("updateFollowerCount");
      window.dispatchEvent(event);
    }
    setOpen(false);
  };
  const [connetionsList, setConnectionsList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followersListState, setFollowersListState] = useState([
    ...followersList,
  ]);
  const [followingUpdated, setFollowingUpdated] = useState(false);

  useEffect(() => {
    setConnectionsList([]);
    const { username } = parseJwt(localStorage.getItem("token"));
    setCurrentUser(username);
    if (open) getConnetionsList();
  }, [open]);

  const getConnetionsList = async () => {
    if (showFollowers) {
      const { data, error } = await getFollowers(email);
      setConnectionsList(data);
      return;
    }
    const { data, error } = await getFollowings(email);
    setConnectionsList(data);
    return;
  };

  const handleToggleFollow = async (username) => {
    setIsLoading(true);
    const { error, message } = await toggleFollowers(username);
    if (!error) {
      if (message === "Followed") {
        setFollowersListState((prev) => [...prev, username]);
      } else {
        setFollowingUpdated(true);
        setFollowersListState((prev) =>
          prev.filter((uname) => uname !== username)
        );
      }
    }
    setIsLoading(false);
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
          <p className="text-center">
            <strong className="fs-3 text-purple">{name}</strong>
          </p>
          <hr />
          <div className="mt-1">
            {connetionsList.map((user, index) => (
              <DisplayList
                key={index}
                name={user}
                currentUser={currentUser}
                followersList={followersListState}
                isLoading={isLoading}
                handleToggleFollow={handleToggleFollow}
              />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
