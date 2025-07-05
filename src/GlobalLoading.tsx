import React, { useEffect, useState } from "react";
import LoadingPage from "./loading/loading-page";

const GlobalLoading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;
  return <>{children}</>;
};

export default GlobalLoading; 