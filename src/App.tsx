import { useState } from "react";
import AthleteInfoForm from "./components/Forms/AthleteInfoForm";

import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import TestimonialForm from "./components/Forms/TestimonialForm";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {


  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/spotlight-form" element={<AthleteInfoForm />} />
          <Route path="/testimonial-form" element={<TestimonialForm />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
