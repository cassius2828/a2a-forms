const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 relative -z-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xl font-bold">Contact Brandon Jackson:</p>
        
        <div className="mt-4">
          <p className="text-xl ">
            <a
              href="mailto:a2aathletics22@gmail.com"
              className="hover:text-green-500 transition-colors duration-300"
            >
              a2aathletics22@gmail.com
            </a>
          </p>
          
          <p className="mt-4 text-xl">
            <a
              href="tel:+16232616540"
              className="hover:text-green-500 transition-colors duration-300"
            >
              623-261-6540
            </a>
          </p>
        </div>

        <p className="mt-4 text-sm opacity-80">
          Located in Sutter, CA
        </p>

        {/* Optional Divider */}
        <div className="my-4 border-t border-neutral-700 w-1/4 mx-auto"></div>

        <p className="mt-4 text-xs opacity-60">
          © {new Date().getFullYear()} A2A Athletics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;