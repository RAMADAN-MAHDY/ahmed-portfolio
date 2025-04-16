"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ShowImages from "./showImages";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "مشروع تصميم شعار",
    description: "تصميم شعار احترافي لشركة تقنية ناشئة.",
    date: "يناير 2023",
    image: "https://miro.medium.com/v2/resize:fit:1358/1*a6km7w5LwfUnRg1uKzNyoA.png",
  },
  {
    title: "مشروع تصميم واجهة مستخدم",
    description: "تصميم واجهة تطبيق موبايل بتجربة مستخدم مميزة.",
    date: "مارس 2023",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*mQCSZEBWr_QLPtHW0WvbSA.png",

  },
  {
    title: "مشروع تصميم بوستر",
    description: "تصميم بوستر إعلاني لحملة تسويقية.",
    date: "مايو 2023",
    image: "https://static.flexmonster.com/uploads/2023/07/27093124/next-js-scheme-.png",

  },
  {
    title: "مشروع تصميم كتيب",
    description: "تصميم كتيب تعريفي لشركة.",
    date: "يوليو 2023",
    image: "https://blog.logrocket.com/wp-content/uploads/2023/09/next-js-13-app-directory.png",

  },
];

const MyProjects = () => {
  useEffect(() => {
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, y: 100 },
      {
        opacity:  1,
        y: 0,
        duration: 1,
        stagger: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-item",
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    ); 
    gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 , opacity: 0, y: 0  },
        {
            opacity:  1,
            duration: 2,
          scaleY: 1,
          duration: 4.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-line",
            start: "top 60%",
          end: "bottom 20%",

            toggleActions: "play none none reverse",
          },
        }
      );
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 bg-[#f3cef366] dark:bg-[#17171700]">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white mt-6 sm:mt-[54px]">
        مشاريعي
      </h2>


      <div className="relative pl-10 ">

      <div className="timeline-line absolute left-5 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 origin-top scale-y-0"></div>

        {projects.map((project, index) => (
          <div
            key={index}
            className="timeline-item mb-8 ml-0 relative flex flex-col "
          >
         <ShowImages imageSrc={project.image} altText={project.title} />
            <span className="absolute -left-3 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-4 border-white dark:border-gray-800"></span>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white w-[60%]">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 w-[60%]">
                {project.description}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {project.date}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;