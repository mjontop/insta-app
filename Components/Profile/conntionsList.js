import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@material-ui/core";
import Link from "next/link";
import getFollowers, {
  getFollowings,
  toggleFollowers,
} from "./helper/ConnctionsListhelper";
import parseJwt from "../../utils/validateJWT";
import PlaceHoldLoader from "../../utils/windowsLoader";
import { CloseRounded } from "@material-ui/icons";
import classes from "../../styles/ConnectionsList.module.css";
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
  index,
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
              <button
                className="btn"
                onClick={() => handleToggleFollow(name, index)}
              >
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
                onClick={() => handleToggleFollow(name, index)}
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
  loaderCount,
}) {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [open, setOpen] = useState(false);
  const [loaders, setLoaders] = useState([]);
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
  const [followersListState, setFollowersListState] = useState([
    ...followersList,
  ]);
  const [followingUpdated, setFollowingUpdated] = useState(false);
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    setConnectionsList([]);
    const { username } = parseJwt(localStorage.getItem("token"));
    setCurrentUser(username);
    setIsListEmpty(false);
    if (open) getConnetionsList();
  }, [open]);

  const getConnetionsList = async () => {
    setIsLoadingList(true);
    if (showFollowers) {
      const { data, error } = await getFollowers(email);
      setConnectionsList(data);
      if (data.length === 0) setIsListEmpty(true);
      setLoaders(new Array(data.length).fill(false));
      setIsLoadingList(false);
      return;
    }
    const { data, error } = await getFollowings(email);
    setConnectionsList(data);
    if (data.length === 0) setIsListEmpty(true);
    setLoaders(new Array(data.length).fill(false));
    setIsLoadingList(false);
    return;
  };

  const handleToggleFollow = async (username, index) => {
    let tempLoaders = [...loaders];
    tempLoaders[index] = true;
    setLoaders([...tempLoaders]);
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
    tempLoaders = [...loaders];
    tempLoaders[index] = false;
    setLoaders([...tempLoaders]);
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
          <div className={classes.header}>
            <p className="text-center mb-0" style={{ flex: 10 }}>
              <strong className="fs-3 text-purple">{name}</strong>
            </p>
            <CloseRounded
              className={classes.enlargedSvg}
              onClick={handleClose}
            />
          </div>
          <hr />
          {isListEmpty ? (
            <>
              {!showFollowers ? (
                <>
                  <p className="fs-2 mx-3">
                    <strong>You aren???t following anyone yet</strong>
                  </p>
                  <p className="mx-3">
                    <small>When you do, they???ll be listed here.</small>
                  </p>
                </>
              ) : (
                <>
                  <p className="fs-2 mx-3">
                    <strong>You don???t have any followers yet</strong>
                  </p>
                  <p className="mx-3">
                    <small>
                      When someone follows you, you???ll see them here.
                    </small>
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              {!isLoadingList ? (
                <>
                  <div className="mt-1">
                    {connetionsList.map((user, index) => (
                      <DisplayList
                        key={index}
                        name={user}
                        currentUser={currentUser}
                        followersList={followersListState}
                        isLoading={loaders[index]}
                        handleToggleFollow={handleToggleFollow}
                        index={index}
                      />
                    ))}
                  </div>
                </>
              ) : (
                [...Array(!loaderCount ? 1 : loaderCount).keys()].map(
                  (val, index) => <PlaceHoldLoader key={index} />
                )
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
