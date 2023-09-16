import React, { useEffect, useState } from "react";
import OrderList from "../Orders/OrderList";
import { useDispatch, useSelector } from "react-redux";
import { UserRole } from "../../models/userRole";
import { verifyUser, resetState } from "../../features/users/usersSlice";
import { verificationRequestDto } from "../../models/verificationDto";
import { notifySuccess, notifyError } from "../../utils/notify";
import UserList from "../User/UserList";
import VerificationModal from "../User/VerificationModal";

const AdminDashboard = ({ children }) => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const { users, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isError && message) {
      notifyError(message);
    }

    if (isSuccess && message) {
      notifySuccess(message);
    }

    dispatch(resetState());
  }, [isSuccess, isLoading, isError, message, dispatch]);

  const handleSetVerify = (data) => {
    setShowModal(true);
    setUserData(data);
  };

  const handleCancelVerification = () => {
    setShowModal(false);
    setUserData(null);
  };

  const handleConfirmVerification = (data) => {
    const thunkData = {
      userId: data.userId,
      verificationDto: verificationRequestDto(data),
    };

    dispatch(verifyUser(thunkData));

    setShowModal(false);
    setUserData(null);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <hr />
      {children}
      <hr />
      <div>
        <h3>All Orders</h3>
        <OrderList orders={orders} />
      </div>
      <hr />
      <div>
        <h3>Sellers</h3>
        <UserList
          users={users.filter((user) => user.role === UserRole.Seller)}
          canVerify={true}
          handleSetVerify={handleSetVerify}
        />
      </div>
      <VerificationModal
        isVisible={showModal}
        data={userData}
        handleClose={handleCancelVerification}
        handleConfirm={handleConfirmVerification}
      />
    </div>
  );
};

export default AdminDashboard;
