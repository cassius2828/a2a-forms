import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const transparentRgba = "rgba(10, 10, 10, 0)";
const blackRgba = "rgba(10, 10, 10, 1)";
gsap.registerPlugin(ScrollTrigger);

export function headerScrollBgColor(isMobile: boolean) {
  gsap.fromTo(
    ".header",
    {
      backgroundColor: isMobile ? blackRgba : transparentRgba,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
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
