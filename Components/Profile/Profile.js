import React, { useEffect, useState } from "react";

import getUsersEmail, {
  getFollowingStatus,
  getUsersConnections,
  getUsersPost,
} from "./helper/ProfileHelper";
import style from "../../styles/Profile.module.css";
import NOTFOUND from "../NotFound";
import FullPageLoader from "../FullPageLoader";
import BasicPopover from "./BasicPopover";
import getUserInfo from "../auth";
import ConnetionsList from "./conntionsList";
import { getFollowings, toggleFollowers } from "./helper/ConnctionsListhelper";
import { Button, Tab, Tabs, Box } from "@material-ui/core";
import { ArrowForwardIosRounded } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import AllPosts from "../Post/AllPosts";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({ data: {}, isLoading: false });
  const [userConnections, setUserConnections] = useState({
    followers: 0,
    following: 0,
    isLoading: false,
    error: false,
  });
  const [isSameUser, setIsSameUser] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [postsCount, setPostCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!!username) {
      sessionStorage.removeItem("allPosts");
      setCurrentTab(0);
      setIsSameUser(getUserInfo().user.username === username);
      setUserData({ ...userData, isLoading: true });
      setUserConnections({ ...userConnections, isLoading: true });
      getUsersEmail(username).then(({ error, ...data }) => {
        if (!error) {
          setUserData({ data, isLoading: false });
          getUsersConnections(data.email).then((data) => {
            if (!data.error) {
              setUserConnections({
                followers: data.followers,
                following: data.following,
                isLoading: false,
                error: false,
              });
            }
          });
          return;
        }
        setUserData((prev) => ({ ...prev, isLoading: false }));
        setUserConnections((prev) => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
        return;
      });
      checkFollowStatus();
      const { isLoggedIn } = getUserInfo();
      if (isLoggedIn) {
        getFollowings(getUserInfo().user.email).then(({ data, error }) => {
          setFollowersList(data);
        });
      }
      if (isLoggedIn) {
        window.addEventListener("updateFollowerCount", () => {
          const email = getUserInfo().user.email;
          getUsersConnections(email).then((data) => {
            if (!data.error) {
              setUserConnections({
                followers: data.followers,
                following: data.following,
                isLoading: false,
                error: false,
              });
            }
          });
        });
      }
    }
  }, [username]);

  const checkFollowStatus = async () => {
    const { follows } = await getFollowingStatus(username);
    setHasFollowed(follows);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const handleToggleFollow = async () => {
    setIsLoading(true);
    const { error, message } = await toggleFollowers(username);
    if (!error) {
      if (message === "Followed") {
        setUserConnections({
          ...userConnections,
          followers: userConnections.followers + 1,
        });
        setHasFollowed(true);
      } else {
        setUserConnections({
          ...userConnections,
          followers: userConnections.followers - 1,
        });
        setHasFollowed(false);
      }
    }
    setIsLoading(false);
  };

  if (userConnections.isLoading || userData.isLoading) {
    return <FullPageLoader />;
  }
  if (userConnections.error) {
    return <NOTFOUND />;
  }

  return (
    <main className={`main ${style.main}`}>
      <div className={style.header}>
        <div className={style.profilePic}>
          <div className="centered-div">
            <img
              className="circle"
              width="150"
              height="150"
              src={
                userData.data.imageBase64 !== ""
                  ? `data:image/png;base64,${userData.data.imageBase64}`
                  : "https://i.stack.imgur.com/l60Hf.png"
              }
            />
          </div>
        </div>
        <div className={style.userStats}>
          <div className={style.user_name_row}>
            <div className="px-2 fs-3">
              <strong>{username}</strong>
            </div>
            {!isSameUser ? (
              <div className="px-2">
                {!hasFollowed ? (
                  <button
                    onClick={handleToggleFollow}
                    className="btn btn-secondary "
                  >
                    Follow
                    {isLoading && (
                      <div
                        className="spinner-border text-white spinner-border-sm mx-2"
                        role="status"
                      ></div>
                    )}
                  </button>
                ) : (
                  <Button onClick={handleToggleFollow} variant="outlined">
                    Following
                    {isLoading && (
                      <div
                        className="spinner-border text-purple spinner-border-sm mx-2"
                        role="status"
                      ></div>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div className="px-2 cursor-ptr">
                <BasicPopover onClick={handleLogout} username={username} />
              </div>
            )}
          </div>
          <div className={style.stats_row}>
            <div className="px-2">
              <b>{postsCount}</b> posts
            </div>
            <div className="px-4 cursor-ptr">
              <ConnetionsList
                name="Followers"
                email={userData.data.email}
                followersList={followersList}
                loaderCount={userConnections.followers}
              >
                <b>{userConnections.followers}</b> followers
              </ConnetionsList>
            </div>
            <div className="px-4 cursor-ptr">
              <ConnetionsList
                name="Following"
                email={userData.data.email}
                followersList={followersList}
                loaderCount={userConnections.following}
                showFollowers={false}
              >
                <b>{userConnections.following}</b> following
              </ConnetionsList>
            </div>
          </div>
          <div className={style.name_bio_row}>
            <div className="px-2">
              <strong>{userData.data.name}</strong>
            </div>
            <div className="px-2 mt-1">
              <p className="text-muted">{userData.data.bio}</p>
            </div>
          </div>
        </div>
      </div>
      {isSameUser ? (
        <div style={{ flex: "0.1" }}>
          <Box
            style={{
              outline: "none !important",
              borderBottom: "2px solid gray",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Tabs
              value={currentTab}
              onChange={(e, val) => setCurrentTab(val)}
              aria-label="basic tabs example"
            >
              <Tab label="All Posts" />
              <Tab label="Create A Post" />
            </Tabs>
          </Box>
        </div>
      ) : (
        <hr />
      )}
      {currentTab === 0 && (
        <AllPosts email={userData.data.email} postCountUpdater={setPostCount} />
      )}
      {currentTab === 1 && (
        <div className={style.new_posts}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              router.push("/posts/upload");
            }}
          >
            Create A New Post <ArrowForwardIosRounded />
          </Button>
        </div>
      )}
    </main>
  );
};

export default Profile;
