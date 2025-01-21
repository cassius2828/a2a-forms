import FormDescriptionCard from "./FormDescriptionCard";

const Landing = () => {
  return (
    <div>
      {/* Main Section with Background Image */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://clients-cr.s3.us-west-1.amazonaws.com/a2a/images/spotlights-home-aftergame.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80 w-full"></div>{" "}
        {/* Dark overlay */}
        <div className="relative z-10 mt-12 flex flex-col items-center justify-end gap-12 h-full text-center text-white px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl mb-6">
              Empowering Athletes. Inspiring Excellence.
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6">
              We appreciate every athlete or parent who would be willing to
              either fill out an Athlete Spotlight story or leave a genuine
              testimonial/review to support our community and continue to allow
              us to chase greatness.
            </p>
            <br />
            <p className="text-lg sm:text-xl lg:text-2xl mb-6">
              {" "}
              Please create an account to have your spotlight or testimonial
              elgible to appear on the website.{" "}
            </p>
          </div>{" "}
          <div>
            {/* Cards Section */}
            <div className="py-16  text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Athlete Spotlight Card */}
                  <FormDescriptionCard
                    title="Athlete Spotlights"
                    text="Athlete Spotlights are personal stories that showcase the hard work,
        dedication, and success of athletes in our community. Share your
        journey, highlight your achievements, and inspire others to chase
        greatness."
                    link="/spotlight-form"
                    btnText="Spotlight Form"
                  />

                  {/* Testimonials/Reviews Card */}
                  <FormDescriptionCard
                    title="Testimonials / Reviews"
                    text="Testimonials and reviews are a great way to share your
                      experience with A2A Athletics. Whether you’re an athlete,
                      parent, or supporter, your feedback helps inspire others
                      and strengthens our community."
                    link="/testimonial-form"
                    btnText=" Testimonial Form"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
