import React from "react";
import { Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";

const PersistLoginComponent = () => {
  return <div>PersistLoginComponent</div>;
};

export default PersistLoginComponent;
