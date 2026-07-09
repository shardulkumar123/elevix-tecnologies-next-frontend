"use client";

import React, { useState } from "react";

import { Provider } from "react-redux";

import { makeStore } from "@/lib/redux/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  // Use state with an initializer function to create the store once
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
