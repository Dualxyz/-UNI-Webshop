import moment from "moment";

export const getDeliveryTime = (order) => {
  return moment(order.createdAt).add(order.deliveryTime, "hours");
};

export const getFormattedTimeToDelivery = (order, currentTime) => {
  const deliveryTime = getDeliveryTime(order);
  const duration = moment.duration(deliveryTime - currentTime, "milliseconds");
  return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
};
