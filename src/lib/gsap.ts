import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function headerScrollBgColor() {
  gsap.fromTo(
    ".header",
    { backgroundColor: "rgba(10, 10, 10, 0)", boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
    {
      backgroundColor: "rgba(10, 10, 10, 1)", 
      boxShadow: "0px 4px 10px rgba(20, 83, 45, 0.5)", // Corrected string format
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".test",
        start: "top 0%",
        end: "top -40%",
        scrub: true,
      },
    }
  );
}