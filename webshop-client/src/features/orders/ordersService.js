import axios from "axios";

const getOrders = async (queryParameters) => {
  const { buyerId, sellerId } = queryParameters;
  const query = buyerId
    ? `?buyerId=${buyerId}`
    : sellerId
    ? `?sellerId=${sellerId}`
    : "";

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/orders${query}`
  );

  return res.data;
};

const createOrder = async (accessToken, orderDto) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/orders`,
    orderDto,
    config
  );

  return res.data;
};

const cancelOrder = async (accessToken, orderId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
    config
  );

  return res.data;
};

const ordersService = {
  getOrders,
  createOrder,
  cancelOrder,
};

export default ordersService;
