import axios from "axios";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "./context/useGlobalContext";
import { useEffect } from "react";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      // Handle 400 errors globally
      return Promise.reject(error.response.data); // Pass the data for local handling
    }
    return Promise.reject(error); // Handle other errors
  }
);

function App() {
  const { scrollToTop } = useGlobalContext();
  const location = useLocation();
  useEffect(() => {
    scrollToTop(false);
  }, [location.pathname]);
  return (
    <>
      <Layout>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
