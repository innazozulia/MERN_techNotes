import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { MdLibraryAdd, MdPersonAdd } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsFileBarGraph } from "react-icons/bs";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  React.useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("notes/new");
  const onNewUserClicked = () => navigate("users/new");
  const onNotesClicked = () => navigate("notes");
  const onUserClicked = () => navigate("users");

  const onLogoutClicked = () => sendLogout();

  // if (isLoading) return <p>Logging Out ...</p>;

  // if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <MdLibraryAdd />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="Add New User"
        onClick={onNewUserClicked}
      >
        <MdPersonAdd />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("dash")) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUserClicked}>
          <RiUserSettingsLine />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("dash")) {
    notesButton = (
      <button
        className="icon-button"
        title="All Notes"
        onClick={onNotesClicked}
      >
        <BsFileBarGraph />
      </button>
    );
  }
  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={onLogoutClicked}>
      <FiLogOut />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}> {error?.datd?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );
  return content;
};

export default DashHeader;
