import React, { useEffect } from "react";
import OrderList from "../Orders/OrderList";
import OrderForm from "../Orders/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  cancelOrder,
  resetState,
} from "../../features/orders/ordersSlice";
import { orderRequestDto } from "../../models/orderDto";
import { notifySuccess, notifyError } from "../../utils/notify";
import { getDeliveryTime } from "../../utils/orderUtils";

const BuyerDashboard = ({ children }) => {
  const dispatch = useDispatch();

  const { articles } = useSelector((state) => state.articles);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  const previousOrders = orders.filter((order) =>
    getDeliveryTime(order).isBefore()
  );
  const activeOrders = orders.filter((order) =>
    getDeliveryTime(order).isSameOrAfter()
  );

  useEffect(() => {
    if (isError && message) {
      notifyError(message);
    }

    if (isSuccess && message) {
      notifySuccess(message);
    }

    dispatch(resetState());
  }, [isSuccess, isLoading, isError, message, dispatch]);

  const handleCreate = (data) => {
    const dto = orderRequestDto(data);
    dispatch(createOrder(dto));
  };

  const handleDelete = (id) => {
    dispatch(cancelOrder(id));
  };

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <hr />
      {children}
      <hr />
      <div>
        <h3>Active Orders</h3>
        <OrderList
          orders={activeOrders}
          canDelete={true}
          handleDelete={handleDelete}
        />
      </div>
      <hr />
      <div>
        <h3>Previous Orders</h3>
        <OrderList orders={previousOrders} />
      </div>
      <hr />
      <div>
        <h3>Create Order</h3>
        {articles.length > 0 ? (
          <OrderForm handleSubmit={handleCreate} articles={articles} />
        ) : (
          <p>
            You can't create an order because there are currently no articles
            available!
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
