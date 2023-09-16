import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import UserDetails from "../../components/User/UserDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  getArticles,
  articlesSlice,
} from "../../features/articles/articlesSlice";
import { editProfile, authSlice } from "../../features/auth/authSlice";
import { getOrders, ordersSlice } from "../../features/orders/ordersSlice";
import { getUsers, usersSlice } from "../../features/users/usersSlice";
import { UserRole } from "../../models/userRole";
import SellerDashboard from "../../components/Layout/SellerDashboard";
import BuyerDashboard from "../../components/Layout/BuyerDashboard";
import AdminDashboard from "../../components/Layout/AdminDashboard";
import { PencilSquare } from "react-bootstrap-icons";
import UserModal from "../../components/User/UserModal";
import { notifySuccess, notifyError } from "../../utils/notify";
import "../../style/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { userId, userInfo, isSuccess, isLoading, isError, message } =
    useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case UserRole.Buyer:
          dispatch(getOrders({ buyerId: userId })).then((_) =>
            dispatch(ordersSlice.actions.resetState())
          );
          dispatch(getArticles()).then((_) =>
            dispatch(articlesSlice.actions.resetState())
          );
          break;
        case UserRole.Seller:
          dispatch(getOrders({ sellerId: userId })).then((_) =>
            dispatch(ordersSlice.actions.resetState())
          );
          dispatch(getArticles(userId)).then((_) =>
            dispatch(articlesSlice.actions.resetState())
          );
          break;
        case UserRole.Admin:
          dispatch(getOrders()).then((_) =>
            dispatch(ordersSlice.actions.resetState())
          );
          dispatch(getUsers()).then((_) =>
            dispatch(usersSlice.actions.resetState())
          );
          break;
        default:
          break;
      }
    }

    if (isError && message) {
      notifyError(message);
    }

    if (isSuccess && message) {
      notifySuccess(message);
    }

    dispatch(authSlice.actions.resetState());
  }, [userInfo, userId, isSuccess, isLoading, isError, message, dispatch]);

  const handleConfirmEdit = (userData) => {
    dispatch(editProfile(userData));
    setShowModal(false);
  };

  if (!userInfo) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const profileComponent = (
    <div>
      <div className="profile-heading">
        <h3>Profile</h3>
        <PencilSquare
          className="profile-edit"
          onClick={(e) => setShowModal(true)}
        />
      </div>
      <UserDetails userData={userInfo} />
    </div>
  );

  return (
    <div style={{ marginBottom: "50px" }}>
      {userInfo.role === UserRole.Buyer ? (
        <BuyerDashboard>{profileComponent}</BuyerDashboard>
      ) : userInfo.role === UserRole.Seller ? (
        <SellerDashboard>{profileComponent}</SellerDashboard>
      ) : userInfo.role === UserRole.Admin ? (
        <AdminDashboard>{profileComponent}</AdminDashboard>
      ) : null}
      <UserModal
        isVisible={showModal}
        data={userInfo}
        handleClose={(e) => setShowModal(false)}
        handleConfirm={handleConfirmEdit}
      />
    </div>
  );
};

export default Dashboard;
