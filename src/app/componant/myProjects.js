"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ShowImages from "./showImages";
import EditProject from './adminComponent/updateProjets';
gsap.registerPlugin(ScrollTrigger);

const MyProjects = () => {

  const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentPath , setcurrentPath] = useState();
  const [projectId , setprojectId] = useState();
  const [showEditFOrm , setshowEditFOrm] = useState(false);

  useEffect(() => {

    
    const currentpath = window.location.pathname;

    // console.log("Current Path:", currentpath);
     setcurrentPath(currentpath)


    const fetchProjects = async () => {
      try {
        const res = await fetch(`${ApiUrl}/get-projects`);
        const data = await res.json();
        // console.log("Fetched Data:", data); // تحقق من البيانات
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [showEditFOrm]);

  useEffect(() => {
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
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
      { scaleY: 0, opacity: 0, y: 0 },
      {
        opacity: 1,
        duration: 2,
        scaleY: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [isLoading]); // عشان الأنميشن يحصل بعد ما الداتا توصل


  const handleDelete = async (projectId) => {
    const confirmDelete = confirm('متأكد إنك عايز تحذف المشروع؟');
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`${ApiUrl}/deleteProject/${projectId}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
      if (res.ok) {
        alert(data.message); // ✅ تم حذف المشروع بنجاح
        // اعمل تحديث للبيانات هنا بقى أو شيل المشروع من الـ state
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('❌ فشل الحذف');
    }
  };
  





        // loading state
  if (isLoading) {      
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-800 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4.93 4.93a10 10 0 0114.14 14.14l1.41 1.41a12 12 0 00-16.97-16.97l1.42 1.42z"
          ></path>
        </svg>
      </div>
    );
  }
  // إذا كانت البيانات فارغة، يمكنك عرض رسالة بدلاً من العناصر   
    if (projects.length === 0) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-gray-800 dark:text-white">لا توجد مشاريع لعرضها</p>
        </div>
        );
    }   

  return (

    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 dark:bg-[#17171700]">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white mt-6 sm:mt-[54px]">
        سابقه أعمالي
      </h2>

      <div className="relative pl-10 ">
        <div className="timeline-line absolute left-5 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 origin-top scale-y-0"></div>

        {projects.map((project) => (
          <div
            key={project._id}
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
            {currentPath === "/admin" &&
            <div className="">
            <button className="text-[24px] bg-[#a5a740] hover:bg-[#787954] rounded-4xl p-3 mr-[20%]" onClick={()=>{
                setprojectId(project._id);
                setshowEditFOrm(true)

            }}>
                تعديل
            </button>
            <button 
            onClick={() => handleDelete(project._id)}
            className="text-[24px] bg-[#a73030] hover:bg-[#613737]  rounded-4xl p-3">
                حذف
            </button>
          </div>
            }
          </div>
        ))}
      </div>
     {showEditFOrm &&
     <div className="flex flex-col justify-center  fixed top-0 bottom-0 left-0 right-0 bg-[#0ac5f341] dark:bg-[#071307]">
        <div className=" relative bg-[#6e355200] lg:left-[30%] lg:w-[40%] m-10 h-screen">
        <button onClick={()=>{
            setshowEditFOrm(false)
        } } className=" absolute bg-[#f3cff3] h-[30px] w-[30px] font-bold cursor-pointer text-[#f00] p-1 ml-[95%] md:left-[0%] top-[-10px] lg:ml-[90%] md:ml-[90%]  mt-10  rounded-full "> x</button>
      <EditProject data={projects} projectId = {projectId}/>
     </div>
     </div>
     }
    </div>
  );
};

export default MyProjects;
