"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  let persistor = persistStore(store);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
