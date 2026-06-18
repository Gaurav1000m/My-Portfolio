import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setCharTimeline() {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1025px)", () => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "center 55%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".whatIDO",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl1
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    tl2
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .fromTo(
        ".what-box-in",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    tl3
      .fromTo(
        ".character-model",
        { y: "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0
      )
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0);
  });

  mm.add("(max-width: 1024px)", () => {
    // Gentle parallax for the mobile photo
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl1.to(".mobile-photo", { y: "15%", opacity: 0, duration: 1 }, 0);

    // Smooth entry for the About section
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        end: "center center",
        toggleActions: "play none none reverse",
      },
    });
    tl2.fromTo(".about-me", 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Dynamic scale/pop-in for What I Do cards
    const tM2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".what-box-in",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    tM2.to(".what-box-in", { display: "flex", duration: 0.1 }, 0)
       .fromTo(".what-box-in", 
          { scale: 0.9, opacity: 0, y: 30 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, 
          0.1
       );
  });

  return mm;
}

export function setAllTimeline() {
  const mm = gsap.matchMedia();

  mm.add("all", () => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
    careerTimeline
      .fromTo(
        ".career-timeline",
        { maxHeight: "0%" },
        { maxHeight: "100%", duration: 1, ease: "none" },
        0
      )
      .fromTo(
        ".career-timeline",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        0
      )
      .fromTo(
        ".career-info-box",
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.5 },
        0
      )
      .fromTo(
        ".career-dot",
        { animationIterationCount: "infinite" },
        {
          animationIterationCount: "1",
          delay: 0.3,
          duration: 0.1,
        },
        0
      );
  });

  mm.add("(min-width: 1025px)", () => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 1.5,
      },
    });
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  });

  mm.add("(max-width: 1024px)", () => {
    const careerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 1.5,
      },
    });
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  });

  return mm;
}
