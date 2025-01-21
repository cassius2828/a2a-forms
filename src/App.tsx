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
import ViewYourSubmissions from "./components/Submissions/ViewYourSubmissions";
import TestimonialsGrid from "./components/Submissions/TestimonialsGrid";
import ErrorBoundary from "./components/ErrorBoundary";
import ProfileSettings from "./components/Profile/ProfileSettings";
import MainDashboard from "./components/Profile/MainDashboard";

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
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile/:userId/settings"
              element={<ProfileSettings />}
            />
            <Route path="/profile/:userId" element={<MainDashboard />} />
            <Route
              path="/spotlight-form"
              element={user ? <AthleteInfoForm /> : <PromptLoginOrRegister />}
            />
            <Route path="/testimonial-form" element={<TestimonialForm />} />
            <Route path="/testimonial-form/:id" element={<TestimonialForm />} />
            <Route path="/submissions" element={<ViewYourSubmissions />} />
            <Route
              path="/submissions/testimonials/:userId"
              element={<TestimonialsGrid />}
            />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </>
  );
}

export default App;
