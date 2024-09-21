"use client";
import React, { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState();
  const [breadcrumbs, setBreadcumbs] = useState([
    {
      name: "Home",
      link: "/",
    },
  ]);
  return (
    <AppContext.Provider value={{ breadcrumbs, setBreadcumbs }}>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default AppContext;
