import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./RTK/UserApi";
import { productApi } from "./RTK/ProductApi";
import { cartApi } from "./RTK/CartApi";
import { orderApi } from "./RTK/OrderApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware),
});

setupListeners(store.dispatch);
