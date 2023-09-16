import React, { useState, useEffect } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import OrderItem from "./OrderItem";
import "../../style/Utils.css";

const OrderList = ({ orders, canDelete, handleDelete }) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(moment()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {orders && orders.length > 0 ? (
        <Card>
          <ListGroup variant="flush">
            {orders.map((order) => (
              <ListGroup.Item key={order.id}>
                <OrderItem
                  orderData={order}
                  currentTime={currentTime}
                  canDelete={canDelete}
                  handleDelete={handleDelete}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <p className="info-message">No available orders</p>
      )}
    </>
  );
};

export default OrderList;
