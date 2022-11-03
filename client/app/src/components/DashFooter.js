import { useNavigate, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClick = () => navigate("/dash");

  let goHomeButton = null;

  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button"
        title="Home"
        onClick={onGoHomeClick}
      >
        <IoIosHome />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: </p>
      <p>Status : </p>
    </footer>
  );
  return content;
};

export default DashFooter;
