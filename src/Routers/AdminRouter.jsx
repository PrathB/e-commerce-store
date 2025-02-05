import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../admin/Admin";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../State/Authorization/action";
import Unauthorized from "../customer/pages/HomePage/Unauthorized";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const jwtFromState = useSelector((store)=>store.auth.jwt);
  const loading = useSelector((store) => store.auth.isLoading);
  const role = useSelector((store) => store.auth.user?.role);
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [jwt,jwtFromState]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={role === "ADMIN" ? <Admin /> : <Unauthorized />}
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
