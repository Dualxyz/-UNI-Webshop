import React from "react";
import "../../style/Order.css";
import { Trash } from "react-bootstrap-icons";
import {
  getDeliveryTime,
  getFormattedTimeToDelivery,
} from "../../utils/orderUtils";

const OrderItem = ({ orderData, currentTime, canDelete, handleDelete }) => {
  return (
    <div className="order">
      <div className="order-details">
        <h5 className="order-title">
          Order for Article (Id={orderData.articleId})
        </h5>
        <div className="order-delivery">
          {getDeliveryTime(orderData) < currentTime ? (
            <>
              Delivered {getDeliveryTime(orderData).from(currentTime)} to
              address "{orderData.address}"
            </>
          ) : (
            <>
              Delivering in {getFormattedTimeToDelivery(orderData, currentTime)}{" "}
              to address "{orderData.address}"
            </>
          )}
        </div>
      </div>

      <div className="order-comment">
        {orderData.comment ? orderData.comment : "-"}
      </div>

      <div className="order-info">
        <div className="order-options">
          {canDelete ? (
            <Trash
              className="order-delete"
              onClick={(e) => handleDelete(orderData.id)}
            />
          ) : null}
        </div>
        <div className="order-quantity">Quantity: {orderData.quantity}</div>
        <div className="order-price">Price: {orderData.price}</div>
        <div className="order-id">ID: {orderData.id}</div>
      </div>
    </div>
  );
};

export default OrderItem;
