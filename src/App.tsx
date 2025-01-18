import AthleteInfoForm from "./components/Forms/AthleteInfoForm";

import Layout from "./components/Layout";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import TestimonialForm from "./components/Forms/TestimonialForm";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import axios from "axios";
import PromptLoginOrRegister from "./components/Auth/PromptLoginOrRegister";
import { useGlobalContext } from "./context/useGlobalContext";
import { useEffect } from "react";

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
  const { user, scrollToTop } = useGlobalContext();
  const location = useLocation();
  useEffect(() => {
    scrollToTop(false);
  }, [location.pathname]);
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/spotlight-form"
            element={user ? <AthleteInfoForm /> : <PromptLoginOrRegister />}
          />
          <Route path="/testimonial-form" element={<TestimonialForm />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
