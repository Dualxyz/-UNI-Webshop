import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import articlesReducer from "../features/articles/articlesSlice";
import ordersReducer from "../features/orders/ordersSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});
