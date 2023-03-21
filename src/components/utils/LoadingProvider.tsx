import React, { createContext, useContext, useState } from "react";
// import { Spinner } from "../common";

interface LoadingProviderProps {
  children?: React.ReactNode;
}

const LoadingContext = createContext({});

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
  );
};

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}

export default LoadingProvider;
