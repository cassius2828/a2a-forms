import { useState } from "react";
import AthleteInfoForm from "./components/Forms/AthleteInfoForm";

import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import TestimonialForm from "./components/Forms/TestimonialForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/spotlight-form" element={<AthleteInfoForm />} />
          <Route path="/testimonial-form" element={<TestimonialForm />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
